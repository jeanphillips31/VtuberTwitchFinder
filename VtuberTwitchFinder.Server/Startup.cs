using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.OpenApi.Models;
using VtuberTwitchFinder.Server.Configuration;
using VtuberTwitchFinder.Server.Services.TwitchService;

namespace VtuberTwitchFinder.Server;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        //services.AddCors(options =>
        //{
        //    options.AddDefaultPolicy(builder =>
        //    {
        //        builder.AllowAnyMethod()
        //            .AllowAnyHeader()
        //            .WithOrigins("localhost", "http://id.twitch.tv", "https://id.twitch.tv")
        //            .AllowCredentials();
        //    });
        //});

        services.AddControllers();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1",
                new OpenApiInfo
                {
                    Version = "v1",
                    Title = "VTuberTwitchFinder.Server - WebApi"
                });
        });

        #region Services

        //Add Services
        services.AddScoped<ITwitchService, TwitchService>();

        #endregion

        services.Configure<TwitchApiSettings>(Configuration);

        #region Authentication

        // services.AddAuthentication(options =>
        // {
        //     options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        // })
        //     .AddTwitch(options =>
        //     {
        //         options.ClientId = Configuration["ClientId"];
        //         options.ClientSecret = Configuration["ClientSecret"];
        //         options.SaveTokens = true;
        //     });

        #endregion
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        //app.UseCors();

        if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

        //app.UseForwardedHeaders(new ForwardedHeadersOptions
        //{
        //    ForwardedHeaders = ForwardedHeaders.XForwardedProto
        //});

        app.UseSwagger();
        app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"); });

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
    }
}