using System.Net.Http.Json;

var pbUrl = "https://pocketbase.ninhngochieu.online";
var client = new HttpClient();

Console.WriteLine($"Seeding data to {pbUrl}...");

var prefix = "hieuninhcv_";

// Bio Data
var bio = new {
    name = "Ninh Ngß╗ìc Hiß║┐u",
    title = "Fullstack Developer",
    summary = "L├á mß╗Öt lß║¡p tr├¼nh vi├¬n c├│ niß╗üm đam m├¬ phß║ºn mß╗üm v├á lu├┤n kh├┤ng ngß╗target hß╗ìc hß╗targeti v├á cß║¡p nhß║¡t c├┤ng nghß╗target mß╗targeti. Vß╗targeti kß╗╣ năng giß║úi quyß║┐t vß║Ñn đß╗ü tß╗targett, khß║ú năng l├á m viß»targetc nh├│m hiß╗targetu quß║ú v├á t├¡nh c├íc c h├▓a đß╗targetng.",
    email = "ninhngochieu@gmail.com",
    github = "github.com/ninhngochieu",
    linkedin = "linkedin.com/in/ninhngochieu",
    location = "H├á Nß╗Öi, Viß╗targett Nam"
};

// Experience
var experience = new[] {
    new {
        company = "C├┤ng ty Cß╗target phß║ºn C├┤ng nghß╗target SAVIS",
        role = "Frontend Developer",
        period = "Th├íng 10/2023 - Hiß╗targetn tß║¡i",
        description = "Ph├ít triß╗targetn giao diß╗targetn ngß╗targeti d├╣ng cho c├íc hß╗target thß╗targetng quß║ún l├¢ doanh nghiß╗targetp, sß╗¡ dß╗targetng React v├á Next.js."
    },
    new {
        company = "C├┤ng ty TNHH Giải pháp Công nghệ Thông tin FSI",
        role = "Junior Developer",
        period = "Tháng 06/2022 - Tháng 09/2023",
        description = "Tham gia phát triển các dự án về số hóa tài liệu và quản lý dữ liệu sử dụng .NET và Angular."
    }
};

// Skills
var skills = new[] {
    new { name = "Languages", items = new[] { "C#", "JavaScript", "TypeScript", "SQL" } },
    new { name = "Frontend", items = new[] { "Next.js", "React", "Tailwind CSS", "Redux" } },
    new { name = "Backend", items = new[] { ".NET Core", "Aspire", "Entity Framework", "Web API" } },
    new { name = "Tools", items = new[] { "Git", "Docker", "PocketBase", "PostgreSQL" } }
};

async Task SeedCollection(string name, object data) {
    Console.WriteLine($"Seeding {name}...");
    try {
        var res = await client.PostAsJsonAsync($"{pbUrl}/api/collections/{prefix}{name}/records", data);
        if (res.IsSuccessStatusCode) Console.WriteLine($"Successfully seeded {name}");
        else Console.WriteLine($"Failed to seed {name}: {res.StatusCode} - {await res.Content.ReadAsStringAsync()}");
    } catch (Exception ex) {
        Console.WriteLine($"Error seeding {name}: {ex.Message}");
    }
}

await SeedCollection("bio", bio);
foreach (var exp in experience) await SeedCollection("experience", exp);
foreach (var skill in skills) await SeedCollection("skills", skill);

Console.WriteLine("Seed completed.");
