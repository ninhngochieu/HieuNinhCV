var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.HieuNinhCV_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var pocketbase = builder.AddContainer("pocketbase", "pocketbase/pocketbase")
    .WithHttpEndpoint(port: 8090, targetPort: 8090, name: "http")
    .WithBindMount("../pocketbase_data", "/pb_data")
    .WithArgs("serve", "--http=0.0.0.0:8090");

server.WithReference(pocketbase);

var webfrontend = builder.AddJavaScriptApp("webfrontend", "../frontend")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .WithReference(server)
    .WaitFor(server);

server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
