/* 
  Bot Name   : BUGsbot
  Developed  : Ngoulla Morel
  Contact    : +237653871607
*/

import fetch from "node-fetch";
import { sendReply } from "../lib/sendReply.js";

export default {
    name: "song",
    description: "Download a song by name",
    category: "music",
    async execute(sock, msg, args) {
        try {
            if (!args || args.length === 0) {
                return sendReply(sock, msg, "❌ Please provide a song name.\nExample: `.song Faded`");
            }

            const query = args.join(" ");
            const apiUrl = `https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(query)}`;
            const res = await fetch(apiUrl);
            const data = await res.json();

            if (!data.status || !data.result || !data.result.download?.url) {
                return sendReply(sock, msg, "❌ Failed to fetch song. Try another keyword.");
            }

            const meta = data.result.metadata;
            const download = data.result.download;

            // ✅ Send thumbnail + song details
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: meta.thumbnail },
                caption: `🎵 *${meta.title}*\n👤 *Artist:* ${meta.author?.name || "Unknown"}\n🕒 *Duration:* ${meta.duration?.timestamp || "N/A"}\n👁 *Views:* ${meta.views?.toLocaleString() || "N/A"}\n📅 *Published:* ${meta.ago || "Unknown"}\n🔗 *YouTube:* ${meta.url}`
            }, { quoted: msg });

            // ✅ Send MP3 audio
            await sock.sendMessage(msg.key.remoteJid, {
                audio: { url: download.url },
                mimetype: "audio/mpeg",
                fileName: download.filename || `${meta.title}.mp3`
            }, { quoted: msg });

        } catch (error) {
            console.error("❌ Error in song command:", error);
            sendReply(sock, msg, "❌ An error occurred while downloading the song.");
        }
    }
};
