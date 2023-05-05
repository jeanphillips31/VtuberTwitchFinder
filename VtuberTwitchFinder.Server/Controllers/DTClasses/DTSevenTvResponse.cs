namespace VtuberTwitchFinder.Server.Controllers.DTClasses;

public class DTSevenTvResponse
{
    public string id { get; set; }
    public string name { get; set; }
    public Owner owner { get; set; }
    public int visibility { get; set; }
    public List<string> visibility_simple { get; set; }
    public string mime { get; set; }
    public int status { get; set; }
    public List<string> tags { get; set; }
    public List<int> width { get; set; }
    public List<int> height { get; set; }
    public List<List<string>> urls { get; set; }
}

public class Owner
{
    public string id { get; set; }
    public string twitch_id { get; set; }
    public string login { get; set; }
    public string display_name { get; set; }
    public Role role { get; set; }
    public string profile_picture_id { get; set; }
}

public class Role
{
    public string id { get; set; }
    public string name { get; set; }
    public int position { get; set; }
    public int color { get; set; }
    public int allowed { get; set; }
    public int denied { get; set; }
}