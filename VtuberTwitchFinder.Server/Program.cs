using Serilog;

namespace VtuberTwitchFinder.Server;

public class Program
{
    public static void Main(string[] args)
    {
        IHost host = CreateHostBuilder(args).Build();
        var logger = host.Services.GetRequiredService<ILogger<Program>>();
    }

    public static IHostBuilder CreateHostBuilder(string[] args)
    {
        return Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); })
            //.UseSerilog(LoggingConfiguration.ConfigureLogging);
            .ConfigureLogging(loggingConfiguration =>
                loggingConfiguration.ClearProviders())
            .UseSerilog((hostingContext, loggerConfiguration) =>
                loggerConfiguration.ReadFrom
                    .Configuration(hostingContext.Configuration));
    }
}