const pbUrl = "https://pocketbase.ninhngochieu.online";
const adminEmail = "ninhngochieu@gmail.com";
const adminPassword = "ErtbdF:j_U2HWy.";

const updateSchema = async () => {
    console.log(`Connecting to ${pbUrl} to update schema...`);
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

    // 1. Get current collection
    const colName = "hieuninhcv_bio";
    const colRes = await fetch(`${pbUrl}/api/collections/${colName}`, { headers });
    const colData = await colRes.json();
    if (!colRes.ok) {
        console.error("Failed to get collection:", colData.message);
        return;
    }

    // 2. Add missing fields
    const missingFields = [
        { name: "github", type: "text" },
        { name: "linkedin", type: "text" },
        { name: "facebook", type: "text" },
        { name: "phone", type: "text" },
        { name: "outlook", type: "email" },
        { name: "cv_url", type: "url" }
    ];

    let updated = false;
    for (const field of missingFields) {
        if (!colData.fields.find(f => f.name === field.name)) {
            console.log(`Adding field: ${field.name}`);
            colData.fields.push(field);
            updated = true;
        }
    }

    if (updated) {
        const updateRes = await fetch(`${pbUrl}/api/collections/${colName}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ fields: colData.fields })
        });
        const updateData = await updateRes.json();
        if (updateRes.ok) {
            console.log("✓ Schema updated successfully.");
        } else {
            console.error("✗ Schema update failed:", updateData.message);
        }
    } else {
        console.log("Schema is already up to date.");
    }
};

updateSchema();
