using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DiscordChatExporter.Core.Discord.Data;
using DiscordChatExporter.Core.Exporting.Writers.Html;
using WebMarkupMin.Core;

namespace DiscordChatExporter.Core.Exporting.Writers;

internal class HtmlMessageWriter : MessageWriter
{
    private readonly TextWriter _writer;
    private readonly string _themeName;

    private readonly HtmlMinifier _minifier = new();
    private readonly List<Message> _messageGroup = new();

    public HtmlMessageWriter(Stream stream, ExportContext context, string themeName)
        : base(stream, context)
    {
        _writer = new StreamWriter(stream);
        _themeName = themeName;
    }

    private bool CanJoinGroup(Message message)
    {
        // If the group is empty, any message can join it
        if (_messageGroup.LastOrDefault() is not { } lastMessage)
            return true;

        // Reply messages cannot join existing groups because they need to appear first
        if (message.Kind == MessageKind.Reply)
            return false;

        // Grouping for system notifications
        if (message.Kind.IsSystemNotification())
        {
            // Can only be grouped with other system notifications
            if (!lastMessage.Kind.IsSystemNotification())
                return false;
        }
        // Grouping for normal messages
        else
        {
            // Can only be grouped with other normal messages
            if (lastMessage.Kind.IsSystemNotification())
                return false;

            // Messages must be within 7 minutes of each other
            if ((message.Timestamp - lastMessage.Timestamp).Duration().TotalMinutes > 7)
                return false;

            // Messages must be from the same author
            if (message.Author.Id != lastMessage.Author.Id)
                return false;

            // If the user changed their name after the last message, their new messages
            // cannot join an existing group.
            if (!string.Equals(message.Author.FullName, lastMessage.Author.FullName, StringComparison.Ordinal))
                return false;
        }

        return true;
    }

    // Use <!--wmm:ignore--> to preserve blocks of code inside the templates
    private string Minify(string html) => _minifier
        .Minify(html, false)
        .MinifiedContent;

    public override async ValueTask WritePreambleAsync(CancellationToken cancellationToken = default)
    {
        var templateContext = new PreambleTemplateContext(Context, _themeName);

        // We are not writing directly to output because Razor
        // does not actually do asynchronous writes to stream.
        await _writer.WriteLineAsync(
            Minify(
                await PreambleTemplate.RenderAsync(templateContext, cancellationToken)
            )
        );
    }

    private async ValueTask WriteMessageGroupAsync(
        IReadOnlyList<Message> messages,
        CancellationToken cancellationToken = default)
    {
        var templateContext = new MessageGroupTemplateContext(Context, messages);

        // We are not writing directly to output because Razor
        // does not actually do asynchronous writes to stream.
        await _writer.WriteLineAsync(
            Minify(
                await MessageGroupTemplate.RenderAsync(templateContext, cancellationToken)
            )
        );
    }

    public override async ValueTask WriteMessageAsync(
        Message message,
        CancellationToken cancellationToken = default)
    {
        await base.WriteMessageAsync(message, cancellationToken);

        // If the message can be grouped, buffer it for now
        if (CanJoinGroup(message))
        {
            _messageGroup.Add(message);
        }
        // Otherwise, flush the group and render messages
        else
        {
            await WriteMessageGroupAsync(_messageGroup, cancellationToken);

            _messageGroup.Clear();
            _messageGroup.Add(message);
        }
    }

    public override async ValueTask WritePostambleAsync(CancellationToken cancellationToken = default)
    {
        // Flush current message group
        if (_messageGroup.Any())
            await WriteMessageGroupAsync(_messageGroup, cancellationToken);

        var templateContext = new PostambleTemplateContext(Context, MessagesWritten);

        // We are not writing directly to output because Razor
        // does not actually do asynchronous writes to stream.
        await _writer.WriteLineAsync(
            Minify(
                await PostambleTemplate.RenderAsync(templateContext, cancellationToken)
            )
        );
    }

    public override async ValueTask DisposeAsync()
    {
        await _writer.DisposeAsync();
        await base.DisposeAsync();
    }
}