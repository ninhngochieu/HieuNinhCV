using Scalar.AspNetCore;
using HieuNinhCV.Server;
using InfisicalConfiguration;

var builder = WebApplication.CreateBuilder(args);

// Add Infisical configuration
builder.Configuration.AddInfisical(new InfisicalConfigBuilder()
    .SetInfisicalUrl("https://infisical.ninhngochieu.online")
    .SetProjectId("416e01cc-9064-40fe-905b-063b541c9afa")
    .SetEnvironment(builder.Environment.EnvironmentName.ToLower() switch
    {
        "development" => "dev",
        "staging" => "staging",
        "production" => "prod",
        _ => "dev"
    })
    .SetAuth(new InfisicalAuthBuilder()
        .SetUniversalAuth(
            "ad397282-7221-4082-9777-186f7dad2b39",
            "REDACTED_INFISICAL_CLIENT_SECRET")
        .Build())
    .Build());

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddProblemDetails();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddHttpClient<IPortfolioService, PortfolioService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

var api = app.MapGroup("/api");

api.MapGet("portfolio/bio", async (IPortfolioService portfolio) => 
    await portfolio.GetBioAsync())
    .WithName("GetBio");

api.MapGet("portfolio/projects", async (IPortfolioService portfolio) => 
    await portfolio.GetProjectsAsync())
    .WithName("GetProjects");

api.MapGet("portfolio/skills", async (IPortfolioService portfolio) => 
    await portfolio.GetSkillsAsync())
    .WithName("GetSkills");

api.MapGet("portfolio/experience", async (IPortfolioService portfolio) => 
    await portfolio.GetExperienceAsync())
    .WithName("GetExperience");

api.MapGet("portfolio/education", async (IPortfolioService portfolio) => 
    await portfolio.GetEducationAsync())
    .WithName("GetEducation");

api.MapPost("portfolio/bio", async (BioDto bio, IPortfolioService portfolio) => 
{
    await portfolio.SaveBioAsync(bio);
    return Results.Ok();
})
.WithName("SaveBio");

api.MapPost("portfolio/projects", async (ProjectDto project, IPortfolioService portfolio) => 
{
    await portfolio.AddProjectAsync(project);
    return Results.Created($"/api/portfolio/projects/{project.Id}", project);
})
.WithName("AddProject");

api.MapDelete("portfolio/projects/{id}", async (string id, IPortfolioService portfolio) => 
{
    await portfolio.DeleteProjectAsync(id);
    return Results.NoContent();
})
.WithName("DeleteProject");

app.MapDefaultEndpoints();

app.UseFileServer();

app.Run();
