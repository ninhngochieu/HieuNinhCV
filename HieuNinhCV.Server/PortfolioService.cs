namespace HieuNinhCV.Server;

public record ProjectDto(string Id, string Title, string Description, string Url, string ImageUrl, string[] TechStack);
public record BioDto(string Name, string Title, string Summary, string Email, string GitHub, string LinkedIn, string Location);
public record SkillDto(string Name, string Category);
public record ExperienceDto(string Company, string Role, string Period, string[] Highlights);
public record EducationDto(string Institution, string Degree, string Major, string Period);

public interface IPortfolioService
{
    Task<BioDto> GetBioAsync();
    Task<IEnumerable<ProjectDto>> GetProjectsAsync();
    Task<IEnumerable<SkillDto>> GetSkillsAsync();
    Task<IEnumerable<ExperienceDto>> GetExperienceAsync();
    Task<EducationDto> GetEducationAsync();

    Task SaveBioAsync(BioDto bio);
    Task AddProjectAsync(ProjectDto project);
    Task DeleteProjectAsync(string id);
}

public class PortfolioService(HttpClient httpClient, IConfiguration configuration) : IPortfolioService
{
    private readonly HttpClient _httpClient = httpClient;
    private readonly string _pbUrl = configuration["services:pocketbase:http:0"] ?? "http://localhost:8090";

    public async Task<BioDto> GetBioAsync()
    {
        try
        {
            // Try fetch first record from 'bio' collection
            var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<BioDto>>($"{_pbUrl}/api/collections/bio/records?limit=1");
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
            var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<ProjectDto>>($"{_pbUrl}/api/collections/projects/records");
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
            var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<SkillDto>>($"{_pbUrl}/api/collections/skills/records");
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
            var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<ExperienceDto>>($"{_pbUrl}/api/collections/experience/records");
            return response?.Items ?? GetMockExperience();
        }
        catch
        {
            return GetMockExperience();
        }
    }

    public async Task<EducationDto> GetEducationAsync()
    {
        try
        {
             var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<EducationDto>>($"{_pbUrl}/api/collections/education/records?limit=1");
             return response?.Items.FirstOrDefault() ?? GetMockEducation();
        }
        catch
        {
            return GetMockEducation();
        }
    }

    public async Task SaveBioAsync(BioDto bio)
    {
        // PocketBase update logic
        var search = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<BioRecord>>($"{_pbUrl}/api/collections/bio/records?limit=1");
        var existing = search?.Items.FirstOrDefault();
        if (existing != null)
        {
            await _httpClient.PatchAsJsonAsync($"{_pbUrl}/api/collections/bio/records/{existing.Id}", bio);
        }
        else
        {
            await _httpClient.PostAsJsonAsync($"{_pbUrl}/api/collections/bio/records", bio);
        }
    }

    public async Task AddProjectAsync(ProjectDto project)
    {
        await _httpClient.PostAsJsonAsync($"{_pbUrl}/api/collections/projects/records", project);
    }

    public async Task DeleteProjectAsync(string id)
    {
        await _httpClient.DeleteAsync($"{_pbUrl}/api/collections/projects/records/{id}");
    }

    private record BioRecord(string Id);
    // --- Helper for PocketBase Response Structure ---
    private record PocketBaseListResponse<T>(IEnumerable<T> Items, int TotalItems);

    // --- Mock Fallbacks ---
    private BioDto GetMockBio() => new ("Ninh Ngoc Hieu", ".NET Developer", "I’m a .NET Developer with 4 years of experience building robust APIs and backend services using ASP.NET Core.", "ninhngochieu@gmail.com", "github.com/ninhngochieu", "linkedin.com/in/hieuninh", "HCM City");
    private IEnumerable<ProjectDto> GetMockProjects() => [new ("1", "Biwase CRM", "CRM system for water supply.", "https://ninhngochieu.site", "/projects/crm.png", [".NET", "React"])];
    private IEnumerable<SkillDto> GetMockSkills() => [new ("C#", "Languages"), new (".NET", "Frameworks")];
    private IEnumerable<ExperienceDto> GetMockExperience() => [new ("Vietnam Blockchain", ".NET Developer", "2023-Present", ["Refactored architecture"])];
    private EducationDto GetMockEducation() => new ("Saigon University", "Bachelor", "Software Engineering", "2017-2021");
}
