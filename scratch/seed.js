const pbUrl = "https://pocketbase.ninhngochieu.online";
const prefix = "hieuninhcv_";
const adminEmail = "ninhngochieu@gmail.com";
const adminPassword = "ErtbdF:j_U2HWy."; // Mật khẩu Admin có dấu (.)

const bio = {
    name: "Ninh Ngọc Hiếu",
    title: "Fullstack Developer",
    summary: "Là một lập trình viên có niềm đam mê phần mềm và luôn không ngừng học hỏi và cập nhật công nghệ mới. Với kỹ năng giải quyết vấn đề tốt, khả năng làm việc nhóm hiệu quả và tính cách hòa đồng.",
    email: "ninhngochieu@gmail.com",
    github: "github.com/ninhngochieu",
    linkedin: "linkedin.com/in/ninhngochieu",
    location: "Hà Nội, Việt Nam"
};

const experience = [
    {
        company: "Công ty Cổ phần Công nghệ SAVIS",
        role: "Frontend Developer",
        period: "Tháng 10/2023 - Hiện tại",
        description: "Phát triển giao diện người dùng cho các hệ thống quản lý doanh nghiệp, sử dụng React và Next.js."
    },
    {
        company: "Công ty TNHH Giải pháp Công nghệ Thông tin FSI",
        role: "Junior Developer",
        period: "Tháng 06/2022 - Tháng 09/2023",
        description: "Tham gia phát triển các dự án về số hóa tài liệu và quản lý dữ liệu sử dụng .NET và Angular."
    }
];

const skills = [
    { name: "Languages", items: ["C#", "JavaScript", "TypeScript", "SQL"] },
    { name: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "Redux"] },
    { name: "Backend", items: [".NET Core", "Aspire", "Entity Framework", "Web API"] }
];

const projects = [
    {
        title: "HieuNinhCV - Portfolio",
        description: "Hệ thống portfolio cá nhân tích hợp PocketBase và .NET Aspire.",
        url: "https://github.com/ninhngochieu/HieuNinhCV",
        imageUrl: "",
        techStack: ["Next.js 15", ".NET 9", "PocketBase"]
    }
];

const education = [
    {
        institution: "Đại học Công nghệ - ĐHQGHN",
        degree: "Kỹ sư",
        major: "Công nghệ thông tin",
        period: "2018 - 2022"
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
