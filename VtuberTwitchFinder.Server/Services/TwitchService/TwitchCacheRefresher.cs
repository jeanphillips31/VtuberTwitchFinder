namespace VtuberTwitchFinder.Server.Services.TwitchService;

public class TwitchCacheRefresher : IHostedService, IDisposable
{
    private readonly ITwitchService _twitchService;
    private Timer _timer;

    public TwitchCacheRefresher(ITwitchService twitchService)
    {
        _twitchService = twitchService;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        // Create a timer to refresh the cached data every 5 minutes
        _timer = new Timer(RefreshCache, null, TimeSpan.Zero, TimeSpan.FromMinutes(5));
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }

    private void RefreshCache(object state)
    {
        // Refresh cached data
        _twitchService.RefreshCache();
    }
}