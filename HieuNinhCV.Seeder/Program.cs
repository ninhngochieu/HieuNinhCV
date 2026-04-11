using System.Net.Http.Json;
using System.Text.Json;

var pbUrl = "https://pocketbase.ninhngochieu.online";
var prefix = "hieuninhcv_";
using var client = new HttpClient();

Console.WriteLine($"--- HieuNinhCV .NET Seeder ---");
Console.WriteLine($"Target: {pbUrl}");

var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

// Bio
var bio = new {
    Name = "Ninh Ngọc Hiếu",
    Title = "Fullstack Developer",
    Summary = "Là một lập trình viên có niềm đam mê phần mềm và luôn không ngừng học hỏi và cập nhật công nghệ mới. Với kỹ năng giải quyết vấn đề tốt, khả năng làm việc nhóm hiệu quả và tính cách hòa đồng.",
    Email = "ninhngochieu@gmail.com",
    Github = "github.com/ninhngochieu",
    Linkedin = "linkedin.com/in/ninhngochieu",
    Location = "Hà Nội, Việt Nam"
};

// Experience
var experiences = new[] {
    new {
        Company = "Công ty Cổ phần Công nghệ SAVIS",
        Role = "Frontend Developer",
        Period = "Tháng 10/2023 - Hiện tại",
        Description = "Phát triển giao diện người dùng cho các hệ thống quản lý doanh nghiệp, sử dụng React và Next.js."
    },
    new {
        Company = "Công ty TNHH Giải pháp Công nghệ Thông tin FSI",
        Role = "Junior Developer",
        Period = "Tháng 06/2022 - Tháng 09/2023",
        Description = "Tham gia phát triển các dự án về số hóa tài liệu và quản lý dữ liệu sử dụng .NET và Angular."
    }
};

// Skills
var skills = new[] {
    new { Name = "Languages", Items = new[] { "C#", "JavaScript", "TypeScript", "SQL" } },
    new { Name = "Frontend", Items = new[] { "Next.js", "React", "Tailwind CSS", "Redux" } },
    new { Name = "Backend", Items = new[] { ".NET Core", "Aspire", "Entity Framework", "Web API" } }
};

async Task Post(string col, object data) {
    var url = $"{pbUrl}/api/collections/{prefix}{col}/records";
    try {
        var res = await client.PostAsJsonAsync(url, data, options);
        if (res.IsSuccessStatusCode) Console.WriteLine($"[OK] Seeded {col}");
        else Console.WriteLine($"[FAIL] {col}: {res.StatusCode} - {await res.Content.ReadAsStringAsync()}");
    } catch (Exception ex) {
        Console.WriteLine($"[ERR] {col}: {ex.Message}");
    }
}

await Post("bio", bio);
foreach (var exp in experiences) await Post("experience", exp);
foreach (var skill in skills) await Post("skills", skill);

Console.WriteLine("Done.");
