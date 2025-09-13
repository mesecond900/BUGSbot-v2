import { sendReply } from "../lib/sendReply.js";
import settings from "../settings.js";
import fs from "fs";

export default {
    name: "mode",
    description: "Switch bot mode between public and private",
    ownerOnly: true,
    async execute(sock, m, args) {
        const newMode = args[0]?.toLowerCase();
        if (!["public", "private"].includes(newMode)) {
            return await sendReply(sock, m, "❌ Usage: !mode <public|private>");
        }

        settings.mode = newMode;
        fs.writeFileSync("./settings.js", `export default ${JSON.stringify(settings, null, 4)};`);

        await sendReply(sock, m, `✅ Bot mode set to *${newMode.toUpperCase()}*.`);
    }
};
