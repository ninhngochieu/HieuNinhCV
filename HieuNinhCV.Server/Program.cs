using Scalar.AspNetCore;
using HieuNinhCV.Server;

var builder = WebApplication.CreateBuilder(args);

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

app.MapDefaultEndpoints();

app.UseFileServer();

app.Run();
