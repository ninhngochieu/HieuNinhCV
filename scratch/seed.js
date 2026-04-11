const pbUrl = "https://pocketbase.ninhngochieu.online";
const prefix = "hieuninhcv_";
const adminEmail = "ninhngochieu@gmail.com";
const adminPassword = "ErtbdF:j_U2HWy."; // Mật khẩu Admin có dấu (.)

const bio = {
    name: "Ninh Ngọc Hiếu",
    title: ".NET Developer",
    summary: "Tôi là một lập trình viên .NET với 4 năm kinh nghiệm xây dựng các API và dịch vụ backend mạnh mẽ bằng ASP.NET Core. Tôi tự hào là một nhà phát triển có trách nhiệm, định hướng chi tiết, coi trọng mã sạch và kiến trúc dễ bảo trì.",
    email: "ninhngochieu@gmail.com",
    github: "github.com/ninhngochieu",
    linkedin: "linkedin.com/in/hieu-ninh-1339b0212/",
    location: "568 Lạc Long Quân, Phường 5, Quận 11, TP. HCM, Việt Nam"
};

const experience = [
    {
        company: "Vietnam Blockchain Corporation",
        role: ".Net Developer",
        period: "06/2023 - Hiện tại",
        highlights: [
            "Hệ thống CRM quản lý đơn hàng cấp nước cho hộ gia đình và doanh nghiệp với hàng triệu bản ghi.",
            "Phát triển chính và bảo trì các tính năng cốt lõi và cải tiến hệ thống liên tục.",
            "Tái cấu trúc kiến trúc hệ thống, cải thiện hiệu suất thêm 30%."
        ]
    },
    {
        company: "TMA Solutions",
        role: ".Net Developer",
        period: "08/2021 - 06/2023",
        highlights: [
            "Hệ thống kê đơn thuốc cho ngành y tế với hàng chục triệu hồ sơ bệnh án.",
            "Thiết kế và tối ưu hóa các module báo cáo, phát triển các tính năng nhỏ.",
            "Đảm bảo tiến độ công việc và đóng góp vào sự ổn định chung của hệ thống."
        ]
    }
];

const skills = [
    { name: "Languages", items: ["C#", "T-SQL", "TypeScript", "HTML", "CSS", "Javascript"] },
    { name: "Frameworks & Platforms", items: [".NET Framework", "Entity Framework", "Dapper", "ReactJS", "Angular"] },
    { name: "Databases", items: ["Microsoft SQL Server", "MongoDB", "Redis"] },
    { name: "Other", items: ["Git", "Azure DevOps", "Docker", "Linux", "Terraform", "Kafka"] }
];

const projects = [
    {
        title: "Biwase CRM",
        description: "Hệ thống CRM xây dựng trên cấu trúc legacy cho khách hàng Biwase.",
        url: "https://www.ninhngochieu.site",
        imageUrl: "/projects/crm.png",
        techStack: ["ReactJS", ".NET 6", "SQL Server", "MongoDB"]
    },
    {
        title: "Webstercare Medication Prescription",
        description: "Hệ thống kê đơn thuốc cho khách hàng Webstercare tại Úc.",
        url: "https://www.ninhngochieu.site",
        imageUrl: "/projects/medication.png",
        techStack: ["Angular", ".NET 6", "Azure Service Bus"]
    }
];

const education = [
    {
        institution: "Saigon University",
        degree: "Cử nhân",
        major: "Kỹ thuật phần mềm",
        period: "10/2017 - 12/2021"
    }
];

const seed = async () => {
    console.log(`--- HieuNinhCV JS Upsert Seeder ---`);
    console.log(`Connecting to ${pbUrl}...`);

    const authRes = await fetch(`${pbUrl}/api/collections/_superusers/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: adminEmail, password: adminPassword })
    });
    const authData = await authRes.json();
    if (!authRes.ok) {
        console.error("Login failed:", authData.message);
        return;
    }
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': authData.token
    };

    const upsert = async (col, data, matchFields = []) => {
        const collectionName = `${prefix}${col}`;
        try {
            // 1. Search for existing
            let filter = "";
            if (matchFields.length > 0) {
                filter = matchFields.map(f => `${f}="${data[f]}"`).join(" && ");
            }

            const searchRes = await fetch(`${pbUrl}/api/collections/${collectionName}/records?limit=1${filter ? `&filter=(${filter})` : ''}`, { headers });
            const searchData = await searchRes.json();
            const existing = searchData.items?.[0];

            if (existing) {
                console.log(`Updating ${col}: ${existing.id}`);
                const res = await fetch(`${pbUrl}/api/collections/${collectionName}/records/${existing.id}`, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify(data)
                });
                if (res.ok) console.log(`✓ Updated ${col}`);
                else console.log(`✗ Update failed ${col}: ${res.status}`);
            } else {
                console.log(`Creating ${col}...`);
                const res = await fetch(`${pbUrl}/api/collections/${collectionName}/records`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(data)
                });
                if (res.ok) console.log(`✓ Created ${col}`);
                else console.log(`✗ Creation failed ${col}: ${res.status}`);
            }
        } catch (e) {
            console.log(`! Error ${col}: ${e.message}`);
        }
    };

    // Upsert Bio (match by nothing, just use first record)
    await upsert('bio', bio);
    
    // Upsert Experience (match by company)
    for (const exp of experience) {
        await upsert('experience', exp, ['company', 'role']);
    }

    // Upsert Skills (match by name)
    for (const skill of skills) {
        await upsert('skills', skill, ['name']);
    }

    // Upsert Projects (match by title)
    for (const project of projects) {
        await upsert('projects', project, ['title']);
    }

    // Upsert Education (match by institution)
    for (const edu of education) {
        await upsert('education', edu, ['institution']);
    }

    console.log("Upsert finished.");
};

seed();
