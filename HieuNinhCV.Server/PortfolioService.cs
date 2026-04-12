using System.Text.Json.Serialization;

namespace HieuNinhCV.Server;

public record ProjectDto(string Id, string Title, string Description, string Url, string ImageUrl, string[] TechStack);
public record BioDto(string Id, string Name, string Title, string Summary, string Email, string GitHub, string LinkedIn, string Location);
public record SkillDto(string Name, string[] Items);
public record ExperienceDto(
    string Company, 
    string Role, 
    string Period, 
    string[] Highlights, 
    [property: JsonPropertyName("startDate")] DateTime? StartDate = null, 
    [property: JsonPropertyName("endDate")] DateTime? EndDate = null
);
public record EducationDto(string Institution, string Degree, string Major, string Period);

public interface IPortfolioService
{
    Task<BioDto> GetBioAsync();
    Task<IEnumerable<ProjectDto>> GetProjectsAsync();
    Task<IEnumerable<SkillDto>> GetSkillsAsync();
    Task<IEnumerable<ExperienceDto>> GetExperienceAsync();
    Task<IEnumerable<EducationDto>> GetEducationAsync();

    Task SaveBioAsync(BioDto bio);
    Task AddProjectAsync(ProjectDto project);
    Task DeleteProjectAsync(string id);
}

public class PortfolioService(HttpClient httpClient, IConfiguration configuration) : IPortfolioService
{
    private readonly HttpClient _httpClient = httpClient;
    private readonly string _pbUrl = configuration["services:pocketbase:http:0"] ?? "https://pocketbase.ninhngochieu.online";

    public async Task<BioDto> GetBioAsync()
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<BioDto>>($"{_pbUrl}/api/collections/hieuninhcv_bio/records");
            return response?.Items.FirstOrDefault() ?? GetMockBio();
        }
        catch
        {
            return GetMockBio();
        }
    }

    public async Task<IEnumerable<ProjectDto>> GetProjectsAsync()
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<ProjectDto>>($"{_pbUrl}/api/collections/hieuninhcv_projects/records");
            return response?.Items ?? GetMockProjects();
        }
        catch
        {
            return GetMockProjects();
        }
    }

    public async Task<IEnumerable<SkillDto>> GetSkillsAsync()
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<SkillDto>>($"{_pbUrl}/api/collections/hieuninhcv_skills/records");
            return response?.Items ?? GetMockSkills();
        }
        catch
        {
            return GetMockSkills();
        }
    }

    public async Task<IEnumerable<ExperienceDto>> GetExperienceAsync()
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<ExperienceDto>>(
                $"{_pbUrl}/api/collections/hieuninhcv_experience/records");
            var items = response?.Items ?? GetMockExperience();
            
            // Sort in memory: "Present" (null EndDate) at the top, then descending by date
            return items.OrderByDescending(e => e.EndDate ?? DateTime.MaxValue)
                        .ThenByDescending(e => e.StartDate ?? DateTime.MinValue);
        }
        catch
        {
            return GetMockExperience();
        }
    }

    public async Task<IEnumerable<EducationDto>> GetEducationAsync()
    {
        try
        {
             var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<EducationDto>>($"{_pbUrl}/api/collections/hieuninhcv_education/records");
             return response?.Items ?? GetMockEducation();
        }
        catch
        {
            return GetMockEducation();
        }
    }

    public async Task SaveBioAsync(BioDto bio)
    {
        var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<BioDto>>($"{_pbUrl}/api/collections/hieuninhcv_bio/records");
        var existing = response?.Items.FirstOrDefault();
        if (existing != null)
        {
            await _httpClient.PatchAsJsonAsync($"{_pbUrl}/api/collections/hieuninhcv_bio/records/{existing.Id}", bio);
        }
        else
        {
            await _httpClient.PostAsJsonAsync($"{_pbUrl}/api/collections/hieuninhcv_bio/records", bio);
        }
    }

    public async Task AddProjectAsync(ProjectDto project)
    {
        await _httpClient.PostAsJsonAsync($"{_pbUrl}/api/collections/hieuninhcv_projects/records", project);
    }

    public async Task DeleteProjectAsync(string id)
    {
        await _httpClient.DeleteAsync($"{_pbUrl}/api/collections/hieuninhcv_projects/records/{id}");
    }

    private record BioRecord(string Id);
    // --- Helper for PocketBase Response Structure ---
    private record PocketBaseListResponse<T>(IEnumerable<T> Items, int TotalItems);

    // --- Mock Fallbacks ---
    private BioDto GetMockBio() 
    {
        var years = (DateTime.Now.Year - 2021) + (DateTime.Now.Month >= 8 ? 0 : -1);
        return new ("1", "Ninh Ngoc Hieu", ".NET Developer", $"{years}+ years experience as a .NET Developer building robust APIs with ASP.NET Core. Dedicated to clean code, maintainable architecture, and collaborative excellence in every project.", "ninhngochieu@gmail.com", "github.com/ninhngochieu", "linkedin.com/in/hieu-ninh-1339b0212/", "HCM City, Vietnam");
    }
    private IEnumerable<ProjectDto> GetMockProjects() => [
        new ("1", "Biwase CRM", "CRM system built on legacy structure for the Biwase water company.", "https://www.ninhngochieu.site", "/projects/crm.png", ["ReactJS", ".NET 6", "SQL Server", "MongoDB"]),
        new ("2", "Webstercare Medication Prescription", "Medical prescription system for Webstercare Australia.", "https://www.ninhngochieu.site", "/projects/medication.png", ["Angular", ".NET 6", "Azure Service Bus"])
    ];
    private IEnumerable<SkillDto> GetMockSkills() => [
        new ("Languages", ["C#", "T-SQL", "TypeScript", "Javascript"]),
        new ("Frameworks & Platforms", [".NET Framework", "Entity Framework", "Dapper"]),
        new ("Frontend", ["React", "Angular", "TanStack", "HTML", "CSS"]),
        new ("Databases", ["Microsoft SQL Server", "MongoDB", "Redis"]),
        new ("Other", ["Git", "Azure DevOps", "Docker", "Linux", "Terraform", "Kafka"])
    ];
    private IEnumerable<ExperienceDto> GetMockExperience() => [
        new ("FPT Telecom", ".Net Developer", "08/2025 - Present", ["Sales and retail software systems built on microservices architecture.", "Optimized for extreme scale, handling peak traffic of 7,000+ RPS.", "Achieved high delivery progress on critical milestones."], new DateTime(2025, 8, 1), null),
        new ("Vietnam Blockchain Corporation", ".Net Developer", "06/2025 - 07/2025", ["CRM system for water supply business with millions of records.", "Refactored architecture to improve performance by 30%."], new DateTime(2025, 6, 1), new DateTime(2025, 7, 31)),
        new ("TMA Solutions", ".Net Developer", "08/2021 - 06/2025", ["Medical prescription system managing tens of millions of records.", "Optimized reporting modules for high-volume queries."], new DateTime(2021, 8, 1), new DateTime(2025, 6, 30))
    ];
    private IEnumerable<EducationDto> GetMockEducation() => [new ("Saigon University", "Bachelor", "Software Engineering", "10/2017 - 12/2021")];
}
