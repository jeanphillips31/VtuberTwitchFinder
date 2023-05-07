namespace VtuberTwitchFinder.Server.Controllers.DTClasses.APIResponses;

public class DTTwitchEmote
{
    public string id { get; set; }
    public string name { get; set; }
    public Images images { get; set; }
    public string tier { get; set; }
    public string emote_type { get; set; }
    public string emote_set_id { get; set; }
    public List<string> format { get; set; }
    public List<string> scale { get; set; }
    public List<string> theme_mode { get; set; }
}

public class Images
{
    public string url_1x { get; set; }
    public string url_2x { get; set; }
    public string url_4x { get; set; }
}