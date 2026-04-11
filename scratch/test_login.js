// Note: This script assumes the pocketbase JS SDK is available or uses fetch internally.
// To run this, you may need: npm install pocketbase

async function testLogin(email, password) {
    const url = 'https://pocketbase.ninhngochieu.online/api/collections/users/auth-with-password';
    console.log(`Attempting login for: ${email}`);
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identity: email, password: password })
        });
        
        const data = await res.json();
        
        if (res.ok) {
            console.log("✓ Login Successful!");
            console.log("Token:", data.token);
            console.log("User ID:", data.record.id);
            console.log("Is Valid:", !!data.token);
        } else {
            console.log(`✗ Login Failed: ${res.status}`);
            console.log(data.message || data);
        }
    } catch (e) {
        console.log(`! Error: ${e.message}`);
    }
}

// Get from command line args
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.log("Usage: node scratch/test_login.js <email> <password>");
} else {
    testLogin(email, password);
}
