namespace VtuberTwitchFinder.Server.Controllers.DTClasses;

public class DTVTuber
{
    public string TwitchId { get; set; }
    public string TwitchName { get; set; }
    public string TwitchUsername { get; set; }
    public string StreamTitle { get; set; }
    public string CurrentGameName { get; set; }
    public int CurrentViewerCount { get; set; }
    public string CurrentThumbnailUrl { get; set; }
}