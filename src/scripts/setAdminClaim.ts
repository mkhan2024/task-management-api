import { auth } from "../config/firebaseConfig";

const email = process.argv[2];

if (!email) {
    console.error("Usage: npx ts-node --files src/scripts/setAdminClaim.ts <user-email>");
    process.exit(1);
}

async function setAdminClaim() {
    try {
        const userRecord = await auth.getUserByEmail(email);

        await auth.setCustomUserClaims(userRecord.uid, {
            role: "admin",
            admin: true,
        });

        console.log(`Admin claim set successfully for ${email}`);
        console.log(`UID: ${userRecord.uid}`);
        process.exit(0);
    } catch (error) {
        console.error("Failed to set admin claim:", error);
        process.exit(1);
    }
}

setAdminClaim();