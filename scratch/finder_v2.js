const pbUrl = "https://pocketbase.ninhngochieu.online";
const pass = "ErtbdF:j_U2HWy";
const identities = ["admin", "ninhngochieu", "hieu"];

async function check() {
    for (const id of identities) {
        process.stdout.write(`Testing identity '${id}'... `);
        const res = await fetch(`${pbUrl}/api/collections/_superusers/auth-with-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identity: id, password: pass })
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
