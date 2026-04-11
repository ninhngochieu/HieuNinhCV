namespace HieuNinhCV.Server;

public record ProjectDto(string Id, string Title, string Description, string Url, string ImageUrl, string[] TechStack);
public record BioDto(string Id, string Name, string Title, string Summary, string Email, string GitHub, string LinkedIn, string Location);
public record SkillDto(string Name, string Category);
public record ExperienceDto(string Company, string Role, string Period, string[] Highlights);
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
            var response = await _httpClient.GetFromJsonAsync<PocketBaseListResponse<ExperienceDto>>($"{_pbUrl}/api/collections/hieuninhcv_experience/records");
            return response?.Items ?? GetMockExperience();
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
    private BioDto GetMockBio() => new ("1", "Ninh Ngọc Hiếu", ".NET Developer", "Tôi là một lập trình viên .NET với 4 năm kinh nghiệm xây dựng các API và dịch vụ backend mạnh mẽ bằng ASP.NET Core. Tôi tự hào là một nhà phát triển có trách nhiệm, định hướng chi tiết, coi trọng mã sạch và kiến trúc dễ bảo trì.", "ninhngochieu@gmail.com", "github.com/ninhngochieu", "linkedin.com/in/hieu-ninh-1339b0212/", "568 Lạc Long Quân, Phường 5, Quận 11, TP. HCM, Việt Nam");
    private IEnumerable<ProjectDto> GetMockProjects() => [
        new ("1", "Biwase CRM", "Hệ thống CRM xây dựng trên cấu trúc legacy cho khách hàng Biwase.", "https://www.ninhngochieu.site", "/projects/crm.png", ["ReactJS", ".NET 6", "SQL Server", "MongoDB"]),
        new ("2", "Webstercare Medication Prescription", "Hệ thống kê đơn thuốc cho khách hàng Webstercare tại Úc.", "https://www.ninhngochieu.site", "/projects/medication.png", ["Angular", ".NET 6", "Azure Service Bus"])
    ];
    private IEnumerable<SkillDto> GetMockSkills() => [
        new ("C#, T-SQL, TypeScript, HTML, CSS, Javascript", "Languages"),
        new (".NET Framework, Entity Framework, Dapper, ReactJS, Angular", "Frameworks & Platforms"),
        new ("Microsoft SQL Server, MongoDB, Redis", "Databases")
    ];
    private IEnumerable<ExperienceDto> GetMockExperience() => [
        new ("Vietnam Blockchain Corporation", ".Net Developer", "06/2023 - Hiện tại", ["Hệ thống CRM quản lý đơn hàng cấp nước...", "Tái cấu trúc kiến trúc hệ thống, cải thiện hiệu suất thêm 30%."]),
        new ("TMA Solutions", ".Net Developer", "08/2021 - 06/2023", ["Hệ thống kê đơn thuốc cho ngành y tế...", "Thiết kế và tối ưu hóa các module báo cáo."])
    ];
    private IEnumerable<EducationDto> GetMockEducation() => [new ("Saigon University", "Cử nhân", "Kỹ thuật phần mềm", "10/2017 - 12/2021")];
}
