const pbUrl = "https://pocketbase.ninhngochieu.online";
const adminEmail = "ninhngochieu@gmail.com";
const adminPassword = "ErtbdF:j_U2HWy.";

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
    console.log("--- Migration: Adding startDate/endDate to hieuninhcv_experience ---");
    
    let token = await attemptLogin("/api/collections/_superusers/auth-with-password", adminEmail, adminPassword);
    if (!token) token = await attemptLogin("/api/admins/auth-with-password", adminEmail, adminPassword);

    if (!token) {
        console.error("Failed to login");
        return;
    }

    const headers = { 'Content-Type': 'application/json', 'Authorization': token };

    // Fetch current collection
    const getRes = await fetch(`${pbUrl}/api/collections/hieuninhcv_experience`, { headers });
    if (!getRes.ok) {
        console.error("Failed to fetch collection");
        return;
    }
    const collection = await getRes.json();

    // Add fields
    const hasStartDate = collection.fields.some(f => f.name === 'startDate');
    const hasEndDate = collection.fields.some(f => f.name === 'endDate');

    if (!hasStartDate) {
        collection.fields.push({ name: "startDate", type: "date" });
    }
    if (!hasEndDate) {
        collection.fields.push({ name: "endDate", type: "date" });
    }

    if (!hasStartDate || !hasEndDate) {
        const patchRes = await fetch(`${pbUrl}/api/collections/hieuninhcv_experience`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ fields: collection.fields })
        });
        if (patchRes.ok) console.log("✓ Added startDate and endDate fields!");
        else console.error("✗ Failed to update schema:", await patchRes.text());
    } else {
        console.log("Fields already exist.");
    }
}

run();
