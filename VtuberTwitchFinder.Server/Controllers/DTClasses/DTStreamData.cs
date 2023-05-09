namespace VtuberTwitchFinder.Server.Controllers.DTClasses;

public class DTStreamData
{
    public IEnumerable<DTVTuber> VTubers { get; set; }
    public string? Cursor { get; set; }
}