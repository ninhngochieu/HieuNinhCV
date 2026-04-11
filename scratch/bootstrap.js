const pbUrl = "https://pocketbase.ninhngochieu.online";
const adminEmail = "ninhngochieu@gmail.com";
const adminPassword = "yS3$#8JEMCVqQ@"; // Mật khẩu dashboard để tạo Collection

const collections = [
    {
        name: "hieuninhcv_bio",
        fields: [
            { name: "name", type: "text" },
            { name: "title", type: "text" },
            { name: "summary", type: "editor" },
            { name: "email", type: "email" },
            { name: "github", type: "text" },
            { name: "linkedin", type: "text" },
            { name: "location", type: "text" }
        ]
    },
    {
        name: "hieuninhcv_projects",
        fields: [
            { name: "title", type: "text" },
            { name: "description", type: "text" },
            { name: "image", type: "file" },
            { name: "tags", type: "json" },
            { name: "github", type: "text" },
            { name: "demo", type: "text" }
        ]
    },
    {
        name: "hieuninhcv_experience",
        fields: [
            { name: "company", type: "text" },
            { name: "role", type: "text" },
            { name: "period", type: "text" },
            { name: "description", type: "text" }
        ]
    },
    {
        name: "hieuninhcv_skills",
        fields: [
            { name: "name", type: "text" },
            { name: "items", type: "json" }
        ]
    },
    {
        name: "hieuninhcv_education",
        fields: [
            { name: "school", type: "text" },
            { name: "degree", type: "text" },
            { name: "period", type: "text" },
            { name: "description", type: "text" }
        ]
    }
];

const seedData = {
    hieuninhcv_bio: {
        name: "Ninh Ngọc Hiếu",
        title: "Fullstack Developer",
        summary: "Đam mê phần mềm, luôn học hỏi công nghệ mới. Kỹ năng giải quyết vấn đề tốt, làm việc nhóm hiệu quả.",
        email: "ninhngochieu@gmail.com",
        github: "github.com/ninhngochieu",
        linkedin: "linkedin.com/in/ninhngochieu",
        location: "Hà Nội, Việt Nam"
    },
    hieuninhcv_experience: [
        {
            company: "SAVIS",
            role: "Frontend Developer",
            period: "2023 - Present",
            description: "Phát triển React/Next.js cho hệ thống quản lý."
        }
    ],
    hieuninhcv_skills: [
        { name: "Backend", items: [".NET Core", "Aspire", "SQL"] },
        { name: "Frontend", items: ["Next.js", "React", "Tailwind"] }
    ]
};

async function bootstrap() {
    console.log("--- PocketBase Bootstrap & Seed ---");

    // 1. Auth as Admin
    const authRes = await fetch(`${pbUrl}/api/collections/_superusers/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: adminEmail, password: adminPassword })
    });
    const authData = await authRes.json();
    if (!authRes.ok) {
        console.error("Admin Login Failed:", authData.message);
        return;
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': authData.token
    };

    // 2. Ensure Collections
    for (const col of collections) {
        process.stdout.write(`Checking collection ${col.name}... `);
        const checkRes = await fetch(`${pbUrl}/api/collections/${col.name}`, { headers });

        if (checkRes.status === 404) {
            process.stdout.write("creating... ");
            const createRes = await fetch(`${pbUrl}/api/collections`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    name: col.name,
                    type: "base",
                    fields: [
                        // System fields like ID are added automatically by PB
                        ...col.fields
                    ],
                    listRule: "", // Public list
                    viewRule: "", // Public view
                    createRule: null, // Admin only
                    updateRule: null,
                    deleteRule: null
                })
            });
            if (createRes.ok) console.log("✓ Done");
            else console.log("✗ Failed", await createRes.json());
        } else {
            console.log("✓ Exists");
        }
    }

    // 3. Seed Data
    console.log("\nSeeding initialized data...");
    for (const [col, data] of Object.entries(seedData)) {
        const items = Array.isArray(data) ? data : [data];
        for (const item of items) {
            process.stdout.write(`Seeding ${col}... `);
            const res = await fetch(`${pbUrl}/api/collections/${col}/records`, {
                method: 'POST',
                headers,
                body: JSON.stringify(item)
            });
            if (res.ok) console.log("✓ Done");
            else console.log("✗ Skipping (likely exists or error)");
        }
    }

    console.log("\nBootstrap Finished! Your DB is ready.");
}

bootstrap();
