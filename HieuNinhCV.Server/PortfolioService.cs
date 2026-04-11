namespace HieuNinhCV.Server;

public record ProjectDto(string Id, string Title, string Description, string Url, string ImageUrl, string[] TechStack);
public record BioDto(string Name, string Title, string Summary, string Email, string GitHub, string LinkedIn);

public interface IPortfolioService
{
    Task<BioDto> GetBioAsync();
    Task<IEnumerable<ProjectDto>> GetProjectsAsync();
}

public class PortfolioService(HttpClient httpClient, IConfiguration configuration) : IPortfolioService
{
    private readonly string _pbUrl = configuration["services:pocketbase:http:0"] ?? "http://localhost:8090";

    public async Task<BioDto> GetBioAsync()
    {
        // For a quick starting point, we return some mock data if PocketBase isn't ready
        // But the logic would be: httpClient.GetFromJsonAsync<BioDto>($"{_pbUrl}/api/collections/bio/records/...")
        return new BioDto(
            "Hieu Ninh",
            "Full Stack Developer",
            "Passionate about building scalable and beautiful applications using .NET and modern Web technologies.",
            "contact@hieuninh.cv",
            "github.com/ninhngochieu",
            "linkedin.com/in/hieuninh"
        );
    }

    public async Task<IEnumerable<ProjectDto>> GetProjectsAsync()
    {
        // Mock data for initial show
        return new List<ProjectDto>
        {
            new ("1", "HieuNinhCV", "Professional portfolio built with Next.js 15 and .NET Aspire.", "https://github.com/ninhngochieu/HieuNinhCV", "/projects/cv.png", ["Next.js", ".NET 10", "Aspire"]),
            new ("2", "Modern API", "Scalable API with Scalar documentation and PocketBase integration.", "https://github.com/ninhngochieu/api", "/projects/api.png", [".NET", "PocketBase", "Scalar"]),
            new ("3", "AI Assistant", "Agentic AI assistant for multi-repo management.", "https://github.com/ninhngochieu/ai", "/projects/ai.png", ["TypeScript", "Gemini", "Node.js"])
        };
    }
}
