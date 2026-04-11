var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.HieuNinhCV_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

// var pocketbase = builder.AddContainer("pocketbase", "elestio/pocketbase")
//     .WithImageTag("v0.36.8")
//     .WithHttpEndpoint(port: 8090, targetPort: 8090, name: "http")
//     .WithBindMount("../pocketbase_data", "/pb_data")
//     .WithArgs("serve", "--http=0.0.0.0:8090");

// server.WithReference(pocketbase.GetEndpoint("http"));

var webfrontend = builder.AddJavaScriptApp("webfrontend", "../frontend")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .WithReference(server)
    .WithEnvironment("SERVER_HTTP", server.GetEndpoint("http"))
    .WaitFor(server);

server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
