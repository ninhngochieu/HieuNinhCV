const pbUrl = "https://pocketbase.ninhngochieu.online";
const prefix = "hieuninhcv_";
const adminEmail = "ninhngochieu@gmail.com";
const adminPassword = "ErtbdF:j_U2HWy."; // Mật khẩu Admin có dấu (.)

const bio = {
    name: "Ninh Ngoc Hieu",
    title: ".NET Developer",
    summary: "4+ years experience as a .NET Developer building robust APIs with ASP.NET Core. Dedicated to clean code, maintainable architecture, and collaborative excellence in every project.",
    email: "ninhngochieu@gmail.com",
    github: "github.com/ninhngochieu",
    linkedin: "linkedin.com/in/hieu-ninh-1339b0212/",
    location: "HCM City, Vietnam"
};

const experience = [
    {
        company: "Vietnam Blockchain Corporation",
        role: ".Net Developer",
        period: "06/2023 - Present",
        highlights: [
            "CRM system for managing water supply orders for households and businesses with millions of records.",
            "Principal developer and maintainer, responsible for core features and ongoing system enhancements.",
            "Refactored system architecture to improve performance by 30%."
        ]
    },
    {
        company: "TMA Solutions",
        role: ".Net Developer",
        period: "08/2021 - 06/2023",
        highlights: [
            "Medical prescription system managing tens of millions of healthcare records.",
            "Designed and optimized reporting modules, developed smaller features.",
            "Ensured timely delivery of assigned tasks and contributed to system stability."
        ]
    }
];

const skills = [
    { name: "Languages", items: ["C#", "T-SQL", "TypeScript", "HTML", "CSS", "Javascript"] },
    { name: "Frameworks & Platforms", items: [".NET Framework", "Entity Framework", "Dapper"] },
    { name: "Frontend", items: ["Angular", "TanStack"] },
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
