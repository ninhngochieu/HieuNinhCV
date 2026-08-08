var builder = DistributedApplication.CreateBuilder(args);

// NOTE: The HieuNinhCV.Server (.NET API) project was removed on 2026-08-08
// (frontend-only pivot). The reference below is kept commented to preserve the
// Aspire AppHost file, but the solution is no longer buildable end-to-end.
// var server = builder.AddProject<Projects.HieuNinhCV_Server>("server")
//     .WithHttpHealthCheck("/health")
//     .WithExternalHttpEndpoints();

// var pocketbase = builder.AddContainer("pocketbase", "elestio/pocketbase")
//     .WithImageTag("v0.36.8")
//     .WithHttpEndpoint(port: 8090, targetPort: 8090, name: "http")
//     .WithBindMount("../pocketbase_data", "/pb_data")
//     .WithArgs("serve", "--http=0.0.0.0:8090");

// server.WithReference(pocketbase.GetEndpoint("http"));

// The frontend is now standalone (no backend). Run it directly:
//   cd frontend && npm run dev   (or build the 'hieuninhcv' image)
var webfrontend = builder.AddJavaScriptApp("webfrontend", "../frontend")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints();
//     .WithReference(server)
//     .WithEnvironment("SERVER_HTTP", server.GetEndpoint("http"))
//     .WaitFor(server);

// server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
