const pbUrl = "https://pocketbase.ninhngochieu.online";
const adminEmail = "ninhngochieu@gmail.com";
const adminPassword = "ErtbdF:j_U2HWy.";

async function migrate() {
    console.log("Migrating Bio collection fields...");
    
    // Login
    const authRes = await fetch(`${pbUrl}/api/admins/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: adminEmail, password: adminPassword })
    });
    const { token } = await authRes.json();

    // Get collection
    const colRes = await fetch(`${pbUrl}/api/collections/hieuninhcv_bio`, {
        headers: { 'Authorization': token }
    });
    const collection = await colRes.json();

    // Add fields if missing
    const newFields = [
        { name: "phone", type: "text" },
        { name: "outlook", type: "email" },
        { name: "cvUrl", type: "url" }
    ];

    for (const field of newFields) {
        if (!collection.schema.find(f => f.name === field.name)) {
            collection.schema.push(field);
        }
    }

    // Update collection
    const updateRes = await fetch(`${pbUrl}/api/collections/hieuninhcv_bio`, {
        method: 'PATCH',
        headers: { 
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ schema: collection.schema })
    });

    if (updateRes.ok) {
        console.log("✓ Bio schema updated!");
    } else {
        console.error("✗ Migration failed:", await updateRes.text());
    }
}

migrate();
