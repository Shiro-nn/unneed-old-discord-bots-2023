using System;
using System.IO;
using System.Text.Json;
using DiscordChatExporter.Core.Discord.Data.Common;
using DiscordChatExporter.Core.Utils;
using DiscordChatExporter.Core.Utils.Extensions;
using JsonExtensions.Reading;
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;

namespace DiscordChatExporter.Core.Discord.Data;

// https://discord.com/developers/docs/resources/channel#attachment-object
public partial record Attachment(
    Snowflake Id,
    string Url,
    string FileName,
    string? Description,
    int? Width,
    int? Height,
    FileSize FileSize) : IHasId
{
    public string FileExtension => Path.GetExtension(FileName);

    public bool IsImage => FileFormat.IsImage(FileExtension);

    public bool IsVideo => FileFormat.IsVideo(FileExtension);

    public bool IsAudio => FileFormat.IsAudio(FileExtension);

    public bool IsSpoiler => FileName.StartsWith("SPOILER_", StringComparison.Ordinal);
}

public partial record Attachment
{
    public static Attachment Parse(JsonElement json)
    {
        var id = json.GetProperty("id").GetNonWhiteSpaceString().Pipe(Snowflake.Parse);
        var fileName = json.GetProperty("filename").GetNonNullString();
        var url = UploadAttachment(json.GetProperty("url").GetNonWhiteSpaceString(), fileName);
        var description = json.GetPropertyOrNull("description")?.GetNonWhiteSpaceStringOrNull();
        var width = json.GetPropertyOrNull("width")?.GetInt32OrNull();
        var height = json.GetPropertyOrNull("height")?.GetInt32OrNull();
        var fileSize = json.GetProperty("size").GetInt64().Pipe(FileSize.FromBytes);

        return new Attachment(id, url, fileName, description, width, height, fileSize);
    }
    public static string UploadAttachment(string origin, string name)
    {
        return origin;
        var guid = Guid.NewGuid();
        var dir = $"/home/jsapps/tickets/files/{guid}";
        if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);

        WebRequest request = WebRequest.Create(origin);
        WebResponse response = request.GetResponse();
        using Stream responseStream = response.GetResponseStream();
        using Stream fileStream = File.OpenWrite(Path.Combine(dir, name));
        byte[] buffer = new byte[4096];
        int bytesRead = responseStream.Read(buffer, 0, 4096);
        while (bytesRead > 0)
        {
            fileStream.Write(buffer, 0, bytesRead);
            DateTime nowTime = DateTime.UtcNow;
            bytesRead = responseStream.Read(buffer, 0, 4096);
        }
        fileStream.Close();
        return $"https://bot.fydne.dev/tickets/files/{guid}/{name}";

    }
}
/*
public partial record Attachment
{
    public static Attachment Parse(JsonElement json)
    {
        var id = json.GetProperty("id").GetNonWhiteSpaceString().Pipe(Snowflake.Parse);
        var fileName = json.GetProperty("filename").GetNonNullString();
        var task = Task.Run(async () => await UploadAttachment(json.GetProperty("url").GetNonWhiteSpaceString(), fileName));
        var url = task.GetAwaiter().GetResult();
        var description = json.GetPropertyOrNull("description")?.GetNonWhiteSpaceStringOrNull();
        var width = json.GetPropertyOrNull("width")?.GetInt32OrNull();
        var height = json.GetPropertyOrNull("height")?.GetInt32OrNull();
        var fileSize = json.GetProperty("size").GetInt64().Pipe(FileSize.FromBytes);

        return new Attachment(id, url, fileName, description, width, height, fileSize);
    }
    public static async Task<string> UploadAttachment(string origin, string name)
    {
        HttpClient client = new();
        var dir = $"bot/tickets/{Guid.NewGuid()}";
        var values = new Dictionary<string, string>
        {
            { "link", origin },
            { "name", name },
            { "dir", dir }
        };
        var content = new FormUrlEncodedContent(values);
        await client.PostAsync("http://localhost:2653/upload/link?" +
            $"link={Uri.EscapeDataString(origin)}&name={Uri.EscapeDataString(name)}&dir={Uri.EscapeDataString(dir)}", content);
        return $"https://cdn.scpsl.store/{dir}/{name}";

    }
}*/