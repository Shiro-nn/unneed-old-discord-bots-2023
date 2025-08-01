namespace DiscordChatExporter.Core.Discord.Data;

// https://discord.com/developers/docs/resources/channel#message-object-message-types
public enum MessageKind
{
    Default = 0,
    RecipientAdd = 1,
    RecipientRemove = 2,
    Call = 3,
    ChannelNameChange = 4,
    ChannelIconChange = 5,
    ChannelPinnedMessage = 6,
    GuildMemberJoin = 7,
    ThreadCreated = 18,
    Reply = 19
}

public static class MessageKindExtensions
{
    public static bool IsSystemNotification(this MessageKind c) => (int)c is >= 1 and <= 18;
}