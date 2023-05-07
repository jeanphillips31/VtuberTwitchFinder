namespace VtuberTwitchFinder.Server.Controllers.DTClasses.APIResponses;

public class DTTwitchResponse<T> where T : class
{
    public T Data { get; set; }
    public DTTwitchPagination? Pagination { get; set; }
    public string? Template { get; set; }
}

public class DTTwitchPagination
{
    public string Cursor { get; set; }
}