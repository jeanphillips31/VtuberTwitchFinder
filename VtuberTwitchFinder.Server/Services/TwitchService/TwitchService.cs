using System.Net.Http.Headers;
using FluentResults;
using Microsoft.Extensions.Options;
using TwitchLib.Api;
using VtuberTwitchFinder.Server.Configuration;
using VtuberTwitchFinder.Server.Controllers.DTClasses;

namespace VtuberTwitchFinder.Server.Services.TwitchService;

public class TwitchService : ITwitchService
{
    private static TwitchAPI _api;
    private readonly HttpClient _client;
    private readonly TwitchApiSettings _configuration;
    private readonly ILogger<ITwitchService> _logger;

    public TwitchService(IServiceProvider serviceProvider, IOptions<TwitchApiSettings> configuration, HttpClient client)
    {
        _client = client;
        _logger = serviceProvider.GetRequiredService<ILogger<TwitchService>>();
        _configuration = configuration.Value;
        _api = new TwitchAPI();
        _api.Settings.ClientId = _configuration.ClientId;
        _api.Settings.Secret = _configuration.ClientSecret;
    }

    /// <inheritdoc />
    public async Task<Result<IEnumerable<DTVTuber>>> GetLiveVTubersAsync()
    {
        try
        {
            var twitchStreams = new List<DTTwitchStream>();
            var cursor = string.Empty;
            string accessToken = await _api.Auth.GetAccessTokenAsync();
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            _client.DefaultRequestHeaders.Add("Client-Id", _configuration.ClientId);
            for (var i = 0; i < 10; i++)
            {
                //Add a small delay to rate limit requests
                await Task.Delay(100);
                var response
                    = await _client.GetFromJsonAsync<DTTwitchResponse<DTTwitchStream[]>>(
                        $"https://api.twitch.tv/helix/streams?type=live&first=100&after={cursor}");
                if (response == null) return Result.Fail("Failed to deserialize TwitchResponse");
                twitchStreams.AddRange(response.Data.Where(s => s.tags != null && s.tags.Contains("VTuber", StringComparer.OrdinalIgnoreCase)));
                cursor = response.Pagination.Cursor;
            }

            return Result.Ok(twitchStreams.Select(stream => new DTVTuber
            {
                TwitchId = stream.user_id,
                CurrentGameName = stream.game_name,
                CurrentThumbnailUrl = stream.thumbnail_url.Replace("{width}", "256").Replace("{height}", "144"),
                CurrentViewerCount = stream.viewer_count,
                StreamTitle = stream.title,
                TwitchName = stream.user_name,
                TwitchUsername = stream.user_login
            }));
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Exception in {service}.{method}", nameof(TwitchService), nameof(GetLiveVTubersAsync));
            return Result.Fail(e.Message);
        }
    }

    /// <inheritdoc />
    public async Task<Result<DTStreamerEmotes>> GetChannelEmotes(int broadcasterId)
    {
        try
        {
            //Add a small delay to rate limit requests
            await Task.Delay(100);
            //Create emotes object and initialize children
            var emotes = new DTStreamerEmotes
            {
                SubscriptionEmotes = new DTSubscriptionEmotes()
            };

            string accessToken = await _api.Auth.GetAccessTokenAsync();
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            _client.DefaultRequestHeaders.Add("Client-Id", _configuration.ClientId);
            var response
                = await _client.GetFromJsonAsync<DTTwitchResponse<DTTwitchEmote[]>>(
                    $"https://api.twitch.tv/helix/chat/emotes?broadcaster_id={broadcasterId}");
            if (response == null) return Result.Fail("Failed to deserialize TwitchResponse");

            //Add Follower emotes
            emotes.FollowerEmotes = response.Data.Where(emote => emote.emote_type == "follower").Select(e => new DTEmote
            {
                Id = e.id,
                Name = e.name,
                Url = e.images.url_4x
            });

            //Add Subscriber emotes
            //Add Tier 1 Subscriber emotes
            emotes.SubscriptionEmotes.Tier1Emotes = response.Data.Where(emote => emote.emote_type == "subscriptions" & emote.tier == "1000").Select(
                e =>
                    new DTEmote
                    {
                        Id = e.id,
                        Name = e.name,
                        Url = e.images.url_4x
                    });

            //Add Tier 2 Subscriber emotes
            emotes.SubscriptionEmotes.Tier2Emotes = response.Data.Where(emote => emote.emote_type == "subscriptions" & emote.tier == "2000").Select(
                e =>
                    new DTEmote
                    {
                        Id = e.id,
                        Name = e.name,
                        Url = e.images.url_4x
                    });

            //Add Tier 3 Subscriber emotes
            emotes.SubscriptionEmotes.Tier3Emotes = response.Data.Where(emote => emote.emote_type == "subscriptions" & emote.tier == "3000").Select(
                e =>
                    new DTEmote
                    {
                        Id = e.id,
                        Name = e.name,
                        Url = e.images.url_4x
                    });

            //Add Bits emotes
            emotes.BitsEmotes = response.Data.Where(emote => emote.emote_type == "bitstier").Select(e =>
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
}