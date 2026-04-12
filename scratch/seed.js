const pbUrl = "https://pocketbase.ninhngochieu.online";
const prefix = "hieuninhcv_";
const adminEmail = "ninhngochieu@gmail.com";
const adminPassword = "ErtbdF:j_U2HWy."; // Mật khẩu Admin có dấu (.)

const bio = {
    name: "Ninh Ngoc Hieu",
    title: ".NET Developer",
    summary: "{YEARS_EXP}+ years experience as a .NET Developer building robust APIs with ASP.NET Core. Dedicated to clean code, maintainable architecture, and collaborative excellence in every project.",
    email: "ninhngochieu@gmail.com",
    github: "github.com/ninhngochieu",
    linkedin: "linkedin.com/in/hieu-ninh-1339b0212/",
    location: "HCM City, Vietnam",
    facebook: "facebook.com/ninhngochieu99",
    phone: "+84329151221",
    outlook: "ninhngochieu@outlook.com",
    cv_url: "https://www.topcv.vn/xem-cv/AwlQAQYKBQIMC1cGVwYBDV8IUARSWgFfUwMAUwd147"
};

const contactFields = [
    { name: "github", type: "text" },
    { name: "linkedin", type: "text" },
    { name: "facebook", type: "text" },
    { name: "phone", type: "text" },
    { name: "outlook", type: "email" },
    { name: "cv_url", type: "url" }
];

const experience = [
    {
        company: "FPT Telecom",
        role: ".Net Developer",
        period: "08/2025 - Present",
        startDate: "2025-08-01",
        endDate: null,
        highlights: [
            "Sales and retail software systems built on microservices architecture.",
            "Handled high load with peak traffic of over 7,000 requests per second (RPS).",
            "Ensured high performance and consistent progress on critical delivery milestones."
        ]
    },
    {
        company: "Vietnam Blockchain Corporation",
        role: ".Net Developer",
        period: "06/2025 - 07/2025",
        startDate: "2025-06-01",
        endDate: "2025-07-31",
        highlights: [
            "CRM system for managing water supply business logic for millions of records.",
            "Refactored system architecture to improve performance by 30%."
        ]
    },
    {
        company: "TMA Solutions",
        role: ".Net Developer",
        period: "08/2021 - 06/2025",
        startDate: "2021-08-01",
        endDate: "2025-06-30",
        highlights: [
            "Medical prescription system managing tens of millions of healthcare records.",
            "Designed and optimized reporting modules for high-volume queries.",
            "Ensured system stability and contributed to core feature development."
        ]
    }
];

const skills = [
    { name: "Languages", items: ["C#", "T-SQL", "TypeScript", "Javascript"] },
    { name: "Frameworks & Platforms", items: [".NET Framework", "Entity Framework", "Dapper"] },
    { name: "Frontend", items: ["React", "Angular", "TanStack", "HTML", "CSS"] },
    { name: "Databases", items: ["Microsoft SQL Server", "MongoDB", "Redis"] },
    { name: "Other", items: ["Git", "Azure DevOps", "Docker", "Linux", "Terraform", "Kafka"] }
];

const projects = [
    {
        title: "Biwase CRM",
        description: "CRM system built on legacy structure for the Biwase water company.",
        url: "https://www.ninhngochieu.site",
        imageUrl: "/projects/crm.png",
        techStack: ["ReactJS", ".NET 6", "SQL Server", "MongoDB"]
    },
    {
        title: "Webstercare Medication Prescription",
        description: "Medical prescription system for Webstercare Australia.",
        url: "https://www.ninhngochieu.site",
        imageUrl: "/projects/medication.png",
        techStack: ["Angular", ".NET 6", "Azure Service Bus"]
    }
];

const education = [
    {
        institution: "Saigon University",
        degree: "Bachelor",
        major: "Software Engineering",
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
            let searchUrl = `${pbUrl}/api/collections/${collectionName}/records?limit=1`;
            if (matchFields.length > 0) {
                const filter = matchFields.map(f => `${f}="${data[f]}"`).join(" && ");
                searchUrl += `&filter=(${encodeURIComponent(filter)})`;
            }

            const searchRes = await fetch(searchUrl, { headers });
            const searchData = await searchRes.json();
            if (!searchRes.ok) {
                console.log(`! Search error ${col}: ${searchData.message || searchRes.statusText}`);
                return;
            }
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
