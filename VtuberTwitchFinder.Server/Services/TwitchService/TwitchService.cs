using System.Net;
using System.Net.Http.Headers;
using System.Xml;
using FluentResults;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using TwitchLib.Api;
using VtuberTwitchFinder.Server.Configuration;
using VtuberTwitchFinder.Server.Controllers.DTClasses;
using VtuberTwitchFinder.Server.Controllers.DTClasses.APIResponses;

namespace VtuberTwitchFinder.Server.Services.TwitchService;

public class TwitchService : ITwitchService
{
    private static TwitchAPI _api;
    private readonly HttpClient _client;
    private readonly TwitchApiSettings _configuration;
    private readonly ILogger<ITwitchService> _logger;
    private readonly IMemoryCache _memoryCache;

    public TwitchService(IMemoryCache cache, IServiceProvider serviceProvider,
        IOptions<TwitchApiSettings> configuration, HttpClient client)
    {
        _memoryCache = cache;
        _client = client;
        _logger = serviceProvider.GetRequiredService<ILogger<TwitchService>>();
        _configuration = configuration.Value;
        _api = new TwitchAPI
        {
            Settings =
            {
                ClientId = _configuration.ClientId,
                Secret = _configuration.ClientSecret
            }
        };
    }

    /// <inheritdoc />
    public async Task<Result<DTStreamerEmotes>> GetChannelEmotes(int broadcasterId)
    {
        try
        {
            //Add a small delay to rate limit requests
            await Task.Delay(100);

            await SetAuthHeadersAsync();
            //Create emotes object and initialize children
            var emotes = new DTStreamerEmotes
            {
                SubscriptionEmotes = new DTSubscriptionEmotes()
            };


            //Generate request and send it
            var message = new HttpRequestMessage(HttpMethod.Get,
                $"https://api.twitch.tv/helix/chat/emotes?broadcaster_id={broadcasterId}");
            var messageResponse = await _client.SendAsync(message);
            if (messageResponse.StatusCode != HttpStatusCode.OK)
                return Result.Fail("Failed to get emotes from Twitch API");

            //Deserialize data
            var responseContent = await messageResponse.Content.ReadFromJsonAsync<DTTwitchResponse<DTTwitchEmote[]>>();
            if (responseContent == null) return Result.Fail("Failed to deserialize TwitchResponse");

            //Add Follower emotes
            emotes.FollowerEmotes = responseContent.Data.Where(emote => emote.emote_type == "follower").Select(e =>
                new DTEmote
                {
                    Id = e.id,
                    Name = e.name,
                    Url = e.images.url_4x
                });

            //Add Subscriber emotes
            //Add Tier 1 Subscriber emotes
            emotes.SubscriptionEmotes.Tier1Emotes = responseContent.Data.Where(emote =>
                    (emote.emote_type == "subscriptions") & (emote.tier == "1000"))
                .Select(
                    e =>
                        new DTEmote
                        {
                            Id = e.id,
                            Name = e.name,
                            Url = e.images.url_4x
                        });

            //Add Tier 2 Subscriber emotes
            emotes.SubscriptionEmotes.Tier2Emotes = responseContent.Data.Where(emote =>
                    (emote.emote_type == "subscriptions") & (emote.tier == "2000"))
                .Select(
                    e =>
                        new DTEmote
                        {
                            Id = e.id,
                            Name = e.name,
                            Url = e.images.url_4x
                        });

            //Add Tier 3 Subscriber emotes
            emotes.SubscriptionEmotes.Tier3Emotes = responseContent.Data.Where(emote =>
                    (emote.emote_type == "subscriptions") & (emote.tier == "3000"))
                .Select(
                    e =>
                        new DTEmote
                        {
                            Id = e.id,
                            Name = e.name,
                            Url = e.images.url_4x
                        });

            //Add Bits emotes
            emotes.BitsEmotes = responseContent.Data.Where(emote => emote.emote_type == "bitstier").Select(e =>
                new DTEmote
                {
                    Id = e.id,
                    Name = e.name,
                    Url = e.images.url_4x
                });

            return Result.Ok(emotes);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Exception in {service}.{method}", nameof(TwitchService), nameof(GetChannelEmotes));
            return Result.Fail(e.Message);
        }
    }

    /// <inheritdoc />
    public async Task<Result<DTStreamData>> GetLiveVTubersAsync(string? cursor)
    {
        try
        {
            if (string.IsNullOrEmpty(cursor))
                // Return cached data if cursor is null
                if (_memoryCache.TryGetValue("FirstPageData", out DTStreamData cachedData))
                    return Result.Ok(cachedData);

            return await GetLiveVTubersFromApiAsync(cursor);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Exception in {service}.{method}", nameof(TwitchService), nameof(GetLiveVTubersAsync));
            return Result.Fail(e.Message);
        }
    }

    /// <inheritdoc />
    public async Task<Result<IEnumerable<DTTwitchClip>>> GetChannelClips(int broadcasterId)
    {
        //Get tokens and assign it to the HttpClient
        await SetAuthHeadersAsync();

        //Set the dates to only get clips from the last 30 days
        var startDate = ConvertDateTimeToRFC3339Format(DateTime.UtcNow.AddDays(-30));
        var endDate = ConvertDateTimeToRFC3339Format(DateTime.UtcNow);
        //Generate request and send it
        var message = new HttpRequestMessage(HttpMethod.Get,
            $"https://api.twitch.tv/helix/clips?broadcaster_id={broadcasterId}&first=100&started_at={startDate}&ended_at={endDate}");
        var messageResponse = await _client.SendAsync(message);
        if (messageResponse.StatusCode != HttpStatusCode.OK) return Result.Fail("Failed to get clips from Twitch API");

        //Deserialize data
        var responseContent =
            await messageResponse.Content.ReadFromJsonAsync<DTTwitchResponse<DTTwitchClipResponse[]>>();
        if (responseContent == null) return Result.Fail("Failed to deserialize TwitchResponse");

        //If no clips exist we still want to return an Ok result
        if (!responseContent.Data.Any()) return Result.Ok();
        //Return a new list of the top 3 clips sorted by viewer count
        return Result.Ok(responseContent.Data.OrderBy(x => x.view_count).Take(3).Select(clip => new DTTwitchClip
        {
            Id = clip.id,
            CreatorName = clip.creator_name,
            EmbedUrl = clip.embed_url + $"&parent={_configuration.Parent}",
            Title = clip.title,
            ViewCount = clip.view_count
        }));
    }

    /// <summary>
    ///     Refreshes the cached data every X minutes
    /// </summary>
    public async Task RefreshCache()
    {
        Console.WriteLine("Refreshing Cache...");
        var result = await GetLiveVTubersFromApiAsync(null);
        if (result.IsSuccess)
        {
            _memoryCache.Set("FirstPageData", result.Value);
            Console.WriteLine("Cache Refreshed");
        }
    }

    /// <summary>
    ///     Sets the auth headers for the api calls
    /// </summary>
    private async Task SetAuthHeadersAsync()
    {
        var accessToken = await _api.Auth.GetAccessTokenAsync();
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        _client.DefaultRequestHeaders.Remove("Client-Id");
        _client.DefaultRequestHeaders.Add("Client-Id", _configuration.ClientId);
    }

    /// <summary>
    ///     Get Stream data from Twitch API
    /// </summary>
    private async Task<Result<DTStreamData>> GetLiveVTubersFromApiAsync(string? cursor)
    {
        var twitchStreams = new List<DTTwitchStream>();
        var streamData = new DTStreamData();
        await SetAuthHeadersAsync();
        for (var i = 0; i < 5; i++)
        {
            //Add a small delay to rate limit requests
            await Task.Delay(100);

            //Generate request and send it
            var message = new HttpRequestMessage(HttpMethod.Get,
                $"https://api.twitch.tv/helix/streams?type=live&first=100{(cursor != null || cursor != string.Empty ? $"&after={cursor}" : "")}");
            var messageResponse = await _client.SendAsync(message);
            if (messageResponse.StatusCode != HttpStatusCode.OK)
                return Result.Fail("Failed to get streamers from Twitch API");

            //Deserialize data
            var responseContent =
                await messageResponse.Content.ReadFromJsonAsync<DTTwitchResponse<DTTwitchStream[]>>();
            if (responseContent == null) return Result.Fail("Failed to deserialize TwitchResponse");

            //Generate request to get profiles and send it
            var profileMessage = new HttpRequestMessage(HttpMethod.Get,
                $"https://api.twitch.tv/helix/users?id={string.Join("&id=", responseContent.Data.Select(x => x.user_id))}");
            var profileMessageResponse = await _client.SendAsync(profileMessage);
            if (profileMessageResponse.StatusCode != HttpStatusCode.OK)
                return Result.Fail("Failed to get profiles from Twitch API");

            //Deserialize data
            var profileResponseContent =
                await profileMessageResponse.Content.ReadFromJsonAsync<DTTwitchResponse<DTTwitchStream[]>>();
            if (profileResponseContent == null) return Result.Fail("Failed to deserialize TwitchResponse");

            //Assign the profile picture
            foreach (var dtTwitchStream in responseContent.Data)
                dtTwitchStream.profile_image_url = profileResponseContent.Data
                    .Single(s => s.id == dtTwitchStream.user_id).profile_image_url;

            //Add response to the list to be returned
            twitchStreams.AddRange(responseContent.Data.Where(s =>
                s?.tags != null && s.tags.Contains("VTuber", StringComparer.OrdinalIgnoreCase)));
            cursor = responseContent?.Pagination?.Cursor;
        }

        //Assign data
        streamData.Cursor = cursor;
        streamData.VTubers = twitchStreams.Select(stream => new DTVTuber
        {
            TwitchId = stream.user_id,
            CurrentGameName = stream.game_name,
            CurrentThumbnailUrl = stream.thumbnail_url.Replace("{width}", "1280").Replace("{height}", "720"),
            CurrentViewerCount = stream.viewer_count,
            StreamTitle = stream.title,
            TwitchName = stream.user_name,
            TwitchUsername = stream.user_login,
            Language = DTTwitchLanguage.Languages.ContainsKey(stream.language)
                ? DTTwitchLanguage.Languages[stream.language]
                : "Language Not Set",
            ProfilePictureUrl = stream.profile_image_url
        });
        return Result.Ok(streamData);
    }

    /// <summary>
    ///     Updates a DateTime to RFC3339 Format that is used by the twitch api
    /// </summary>
    private string ConvertDateTimeToRFC3339Format(DateTime date)
    {
        return XmlConvert.ToString(date, XmlDateTimeSerializationMode.Utc);
    }
}