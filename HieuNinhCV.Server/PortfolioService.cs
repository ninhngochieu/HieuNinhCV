using System.Text.Json.Serialization;

namespace HieuNinhCV.Server;

public record ProjectDto(string Id, string Title, string Description, string Url, string ImageUrl, string[] TechStack);
public record BioDto(
    string Id, 
    string Name, 
    string Title, 
    string Summary, 
    string Email, 
    [property: JsonPropertyName("github")] string Github, 
    [property: JsonPropertyName("linkedin")] string Linkedin, 
    string Location, 
    [property: JsonPropertyName("facebook")] string Facebook, 
    [property: JsonPropertyName("phone")] string Phone,
    [property: JsonPropertyName("outlook")] string Outlook,
    [property: JsonPropertyName("cv_url")] string CvUrl
);
public record SkillDto(string Name, string[] Items);
public record ExperienceDto(
    string Company, 
    string Role, 
    string Period, 
    string[] Highlights, 
    [property: JsonPropertyName("startDate"), JsonConverter(typeof(NullablePocketBaseDateConverter))] DateTime? StartDate = null, 
    [property: JsonPropertyName("endDate"), JsonConverter(typeof(NullablePocketBaseDateConverter))] DateTime? EndDate = null
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
    private readonly string _pbUrl = configuration["Services:PocketBase"] ?? throw new InvalidOperationException("PocketBase URL is not configured.");

    public async Task<BioDto> GetBioAsync()
    {
        var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<BioDto>>($"{_pbUrl}/api/collections/hieuninhcv_bio/records");
        return response?.Items.FirstOrDefault() ?? throw new Exception("Bio data not found in PocketBase.");
    }

    public async Task<IEnumerable<ProjectDto>> GetProjectsAsync()
    {
        var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<ProjectDto>>($"{_pbUrl}/api/collections/hieuninhcv_projects/records");
        return response?.Items ?? [];
    }

    public async Task<IEnumerable<SkillDto>> GetSkillsAsync()
    {
        var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<SkillDto>>($"{_pbUrl}/api/collections/hieuninhcv_skills/records");
        return response?.Items ?? [];
    }

    public async Task<IEnumerable<ExperienceDto>> GetExperienceAsync()
    {
        var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<ExperienceDto>>(
            $"{_pbUrl}/api/collections/hieuninhcv_experience/records");
        var items = response?.Items ?? [];
        
        // Sort in memory: "Present" (null EndDate) at the top, then descending by date
        return items.OrderByDescending(e => e.EndDate ?? DateTime.MaxValue)
                    .ThenByDescending(e => e.StartDate ?? DateTime.MinValue);
    }

    public async Task<IEnumerable<EducationDto>> GetEducationAsync()
    {
         var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<EducationDto>>($"{_pbUrl}/api/collections/hieuninhcv_education/records");
         return response?.Items ?? [];
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

    // --- Helper for PocketBase Response Structure ---
    private record PocketBaseListResponse<T>(IEnumerable<T> Items, int TotalItems);
}
