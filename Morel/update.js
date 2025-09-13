import settings from "../settings.js";
import { sendReply } from "../lib/sendReply.js";

export default {
  name: "update",
  description: "Update bot from GitHub (owner only)",
  category: "owner",
  async execute(sock, msg, args) {
    try {
      const sender = msg.key.participant || msg.key.remoteJid;

      // ✅ Check if sender is in ownerNumber list
      if (!settings.ownerNumber.includes(sender.split("@")[0])) {
        return sendReply(sock, msg, "❌ Only the bot owner can use this command.");
      }

      const { exec } = await import("child_process");

      sendReply(sock, msg, "⏳ Updating from GitHub...");

      exec("git pull && npm install", (error, stdout, stderr) => {
        if (error) {
          return sendReply(sock, msg, `❌ Update failed:\n${error.message}`);
        }
        if (stderr) {
          return sendReply(sock, msg, `⚠️ Update warning:\n${stderr}`);
        }
        sendReply(sock, msg, `✅ Update complete:\n${stdout}`);
      });
    } catch (err) {
      console.error("❌ Error in update command:", err);
      sendReply(sock, msg, "❌ An error occurred while updating.");
    }
  }
};
