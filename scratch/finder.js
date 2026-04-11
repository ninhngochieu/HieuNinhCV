const pbUrl = "https://pocketbase.ninhngochieu.online";
const pass = "ErtbdF:j_U2HWy";
const emails = [
    "admin@ninhngochieu.online",
    "hieu@ninhngochieu.online",
    "contact@ninhngochieu.online",
    "ninhngochieu@gmail.com",
    "admin@example.com"
];

async function check() {
    for (const email of emails) {
        process.stdout.write(`Testing ${email}... `);
        const res = await fetch(`${pbUrl}/api/collections/_superusers/auth-with-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identity: email, password: pass })
        });
        if (res.ok) {
            console.log("✓ SUCCESS!");
            process.exit(0);
        } else {
            console.log("✗ Failed");
        }
    }
}
check();
