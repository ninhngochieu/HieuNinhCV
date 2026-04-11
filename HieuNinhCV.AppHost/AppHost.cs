var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.HieuNinhCV_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var webfrontend = builder.AddJavaScriptApp("webfrontend", "../frontend")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .WithReference(server)
    .WaitFor(server);

server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
