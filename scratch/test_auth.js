async function testAuth() {
    const url = 'https://pocketbase.ninhngochieu.online/api/collections/users/auth-methods';
    console.log(`Connecting to: ${url}`);
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (res.ok) {
            console.log("Success! Auth Methods:");
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.log(`Failed: ${res.status}`);
            console.log(data);
        }
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}

testAuth();
