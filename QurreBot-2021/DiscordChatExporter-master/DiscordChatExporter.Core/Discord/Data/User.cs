using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using DiscordChatExporter.Core.Discord.Data.Common;
using DiscordChatExporter.Core.Utils.Extensions;
using JsonExtensions.Reading;
using Newtonsoft.Json;

namespace DiscordChatExporter.Core.Discord.Data;

// https://discord.com/developers/docs/resources/user#user-object
public partial record User(
    Snowflake Id,
    bool IsBot,
    int Discriminator,
    string Name,
    string AvatarUrl) : IHasId
{
    public string DiscriminatorFormatted => $"{Discriminator:0000}";

    public string FullName => $"{Name}#{DiscriminatorFormatted}";
}

public partial record User
{
    private static string GetDefaultAvatarUrl(int discriminator) =>
        $"https://cdn.discordapp.com/embed/avatars/{discriminator % 5}.png";

    private static string GetAvatarUrl(Snowflake id, string avatarHash)
    {
        var user = GetUserInfo(id);
        if (user is not null && user.avatar != "") return user.avatar;
        var extension = avatarHash.StartsWith("a_", StringComparison.Ordinal)
            ? "gif"
            : "png";

        return $"https://cdn.discordapp.com/avatars/{id}/{avatarHash}.{extension}?size=512";
    }

    public static User Parse(JsonElement json)
    {
        var id = json.GetProperty("id").GetNonWhiteSpaceString().Pipe(Snowflake.Parse);
        var isBot = json.GetPropertyOrNull("bot")?.GetBooleanOrNull() ?? false;
        var discriminator = json.GetProperty("discriminator").GetNonWhiteSpaceString().Pipe(int.Parse);
        var name = json.GetProperty("username").GetNonNullString();

        var avatarHash = json.GetPropertyOrNull("avatar")?.GetNonWhiteSpaceStringOrNull();
        var avatarUrl = !string.IsNullOrWhiteSpace(avatarHash)
            ? GetAvatarUrl(id, avatarHash)
            : GetDefaultAvatarUrl(discriminator);

        return new User(id, isBot, discriminator, name, avatarUrl);
    }
    public static readonly Dictionary<string, DiscordUser> Cache = new();
    public static DiscordUser? GetUserInfo(object id)
    {
        try
        {
            if (Cache.TryGetValue($"{id}", out var _cd)) return _cd;
            var url = $"http://api.scpsl.store/discord?id={id}&type=main";
            var request = WebRequest.Create(url);
            request.Method = "POST";
            using var webResponse = request.GetResponse();
            using var webStream = webResponse.GetResponseStream();
            using var reader = new StreamReader(webStream);
            var data = reader.ReadToEnd();
            var des = JsonConvert.DeserializeObject<DiscordUser>(data);
            if (des is not null && !Cache.ContainsKey($"{id}")) Cache.Add($"{id}", des);
            return des;
        }
        catch { return null; }
    }
}
public class DiscordUser
{
    public string id { get; set; } = "";
    public string user { get; set; } = "";
    public string discriminator { get; set; } = "";
    public string avatar { get; set; } = "";
}