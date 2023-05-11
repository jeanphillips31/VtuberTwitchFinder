namespace VtuberTwitchFinder.Server.Controllers.DTClasses;

public class DTTwitchClip
{
    public string Id { get; set; }
    public string EmbedUrl { get; set; }
    public string Title { get; set; }
    public string CreatorName { get; set; }
    public int ViewCount { get; set; }
}