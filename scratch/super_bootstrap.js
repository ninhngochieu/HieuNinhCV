const pbUrl = "https://pocketbase.ninhngochieu.online";
const adminEmail = "ninhngochieu@gmail.com";
const adminPassword = "ErtbdF:j_U2HWy."; // Mật khẩu dashboard

const collections = [
    {
        name: "hieuninhcv_bio",
        fields: [
            { name: "name", type: "text", id: "f1" },
            { name: "title", type: "text", id: "f2" },
            { name: "summary", type: "editor", id: "f3" },
            { name: "email", type: "email", id: "f4" },
            { name: "github", type: "text", id: "f5" },
            { name: "linkedin", type: "text", id: "f6" },
            { name: "location", type: "text", id: "f7" }
        ]
    },
    {
        name: "hieuninhcv_experience",
        fields: [
            { name: "company", type: "text", id: "e1" },
            { name: "role", type: "text", id: "e2" },
            { name: "period", type: "text", id: "e3" },
            { name: "description", type: "text", id: "e4" }
        ]
    },
    {
        name: "hieuninhcv_skills",
        fields: [
            { name: "name", type: "text", id: "s1" },
            { name: "items", type: "json", id: "s2" }
        ]
    },
    {
        name: "hieuninhcv_projects",
        fields: [
            { name: "title", type: "text", id: "p1" },
            { name: "description", type: "text", id: "p2" },
            { name: "url", type: "text", id: "p3" },
            { name: "imageUrl", type: "text", id: "p4" },
            { name: "techStack", type: "json", id: "p5" }
        ]
    },
    {
        name: "hieuninhcv_education",
        fields: [
            { name: "institution", type: "text", id: "ed1" },
            { name: "degree", type: "text", id: "ed2" },
            { name: "major", type: "text", id: "ed3" },
            { name: "period", type: "text", id: "ed4" }
        ]
    }
];

async function attemptLogin(endpoint, identity, password) {
    try {
        const res = await fetch(`${pbUrl}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identity, password })
        });
        const data = await res.json();
        if (res.ok) return data.token;
    } catch (e) { return null; }
    return null;
}

async function run() {
    console.log("--- Super Bootstrap: Attempting to create collections ---");

    // 1. Thử đăng nhập Admin (v0.36+)
    let token = await attemptLogin("/api/collections/_superusers/auth-with-password", adminEmail, adminPassword);

    // 2. Nếu thất bại, thử đăng nhập Admin (Legacy < 0.23)
    if (!token) {
        console.log("Strategy 1 failed, trying Strategy 2 (Legacy)...");
        token = await attemptLogin("/api/admins/auth-with-password", adminEmail, adminPassword);
    }

    if (!token) {
        console.error("CRITICAL: Không thể đăng nhập quyền Admin với email: " + adminEmail);
        console.log("Vui lòng kiểm tra lại EMAIL đăng nhập Dashboard (có thể không phải là gmail này?).");
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };

    // 3. Tạo Collection
    for (const col of collections) {
        console.log(`Working on ${col.name}...`);
        const res = await fetch(`${pbUrl}/api/collections`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                name: col.name,
                type: "base",
                fields: col.fields,
                listRule: "",
                viewRule: ""
            })
        });

        if (res.ok) console.log(`✓ Collection ${col.name} created!`);
        else {
            const err = await res.json();
            if (err.message.includes("must be unique")) {
                console.log(`✓ Collection ${col.name} already exists.`);
            } else {
                console.log(`✗ Failed to create ${col.name}:`, JSON.stringify(err));
            }
        }
    }
    console.log("\nDone! Now you can run node scratch/seed.js");
}

run();
