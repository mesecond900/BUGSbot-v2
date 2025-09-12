import settings from "../settings.js"; // adjust path
import { sendReply } from "../lib/sendReply.js"; // use your sendReply function

export default {
  name: "menu",
  description: "Display all commands grouped in a styled box",
  usage: ".menu",
  type: "general",
  async execute(sock, msg) {
    const chatId = msg.key.remoteJid;
    const sender = msg.key.participant || chatId;
    const userName = msg.pushName || sender.split("@")[0];

    // Define command categories
    const menu = {
      OWNER: [
        "addowner – Add a new bot owner",
        "removeowner – Remove an owner",
        "listowners – Show all owners",
        "block – Block a user",
        "unblock – Unblock a user",
        "listblock – List blocked users",
        "autoread – Toggle auto-read messages",
        "autoreact – Toggle auto emoji reaction",
        "autotyping – Toggle typing indicator",
        "autostatusview – Auto view status",
        "autostatusreact – Auto status reaction",
        "antidelete – Restore deleted messages",
        "broadcast – Send a message to all chats",
        "sysinfo – Show system info",
        "restart – Restart bot"
      ],
      GROUP: [
        "groupinfo – Show group details",
        "grouplink – Get group invite link",
        "setdesc [text] – Change group description",
        "setname [text] – Change group name",
        "setdp – Change group display picture",
        "revoke – Revoke group link",
        "muteall – Mute all members",
        "unmuteall – Unmute all members",
        "lockgroup –  admins can messages",
        "unlockgroup – Everyone can messages",
        "kick @user – Remove a member",
        "add [number] – Add member by number",
        "promote @user – Make admin",
        "demote @user – Remove admin",
        "tagall – Mention everyone",
        "tagadmins – Mention all admins",
        "warn @user – Issue warning",
        "listwarn – Show warning count",
        "resetwarn @user – Reset warnings",
        "pin [message] – Pin message",
        "welcome on/off – Enable/disable welcome",
        "antilink on/off – Block group links",
        "antibot on/off – Block unauthorized bots"
      ],
      GAMES: [
        "truth – Random truth",
        "dare – Random dare",
        "truthdare – Truth/Dare combo",
        "riddle – Random riddle",
        "quiz – Multiple-choice question",
        "guessnumber – Guess a number 1-50",
        "rockpaperscissors – Play RPS",
        "fasttype – Type fast challenge",
        "mathquiz – Solve a math problem",
        "anagram – Unscramble letters",
        "wordhunt – Find words",
        "wordchain – Continue word chain",
        "hangman – Guess the word",
        "emojiquiz – Guess the emoji word",
        "guesstheword – Bot gives hints",
        "quicktap – First to reply wins",
        "flagquiz – Guess the country flag",
        "logoquiz – Guess brand logo",
        "countrycapital – Match country & capital",
        "tictactoe – Play Tic Tac Toe",
        "connect4 – Play Connect 4"
      ],
      AI: [
        "chatgpt4 – Ask ChatGPT 4",
        "chatgpt3 – Ask ChatGPT 3",
        "chatgpt – Ask ChatGPT",
        "openai – Ask OpenAI",
        "gemini – Gemini AI",
        "deepimg – Generate images",
        "image – Generate image",
        "img – Image commands",
        "translate – Translate text",
        "textspeech – Convert text to speech",
        "chatbot – AI chatbot"
      ],
      DOWNLOAD: [
        "play – download video",
        "song1 – download video",
        "play1 – download audio",
        "song – dowmload audio",
        "ytmp3 – youtube audio",
        "ytmp3a – youtube audio",
        "tiktok – tiktok video",
        "tiktok1 – tiktok video",
        "ytmp4 – youtube video",
        "ytmp4v – youtube video",
        "youtube – youtube video",
        "youtbubea – youtube audio",
        "facebook – facebook video",
        "facebook1 – facebook video",
        "instagram – instagram video",
        "instagram1 – instagram video",
        "spotify – audio download",
        "gitclone – git download"
        
      ],
      TOOLS: [
        "whois – Get domain info",
        "webzip – Download website",
        "freeproxy – Get free proxy",
        "pdf – Convert to PDF",
        "urlshort – Shorten URL",
        "obfuscate – Obfuscate code",
        "bible – Get Bible verse"
      ],
      STALKER:[
        "tikstalk – tiktok stalk",
        "igstalk – instagram stalk",
        "ipstalk – ip address stalk",
        "npmstalk – npm packages"
      ],
      FUN: [
        "joke – Random joke",
        "advice – Random advice",
        "quotes – Random quote",
        "motivation – Motivation quote"
      ],
      IMAGES: [
        "toimg – Convert sticker to image",
        "toimg – Convert sticker to video",
        "sticker – Create sticker",
        "glitchtext – Glitch text",
        "cartoontext – Cartoon text",
        "goldtext – Golden text",
        "removebg – Remove background"
      ],
      OTHER:[
        "ping – bot response",
        "owner – show bot owner",
        "whoami – see jid number",
        "repo – github repo",
        "eploit – just for fun",
        "spam – just for fun",
        "infinitespam – just for fun",
        "stopspam – stop runing spams"
      ]
    };

    // Build menu text
    let message = `┏━━━━━━━━━━━━━━━┓\n`;
message += `┃ *Name:* ${settings.botName}\n`;
message += `┃ *Version:* ${settings.version}\n`;
message += `┃ *Prefix:* ${settings.prefix}\n`;
message += `┗━━━━━━━━━━━━━━━┛\n\n`;
message += `Hello, @${userName} 👋\nHere are the available commands:\n*Usage:* type *${settings.prefix}* follow with a command\n*Example:* ${settings.prefix}ping\n\n`;

for (const [category, cmds] of Object.entries(menu)) {
  message += `┏━❖ *${category}* ❖━┓\n`;
  cmds.forEach(cmd => {
    // Split command and explanation
    const [command, ...explanationParts] = cmd.split("–");
    const explanation = explanationParts.join("–").trim();
    message += `│ *${command.trim()}* – ${explanation}\n`;
  });
  message += `┗━━━━━━━━━━━━━━━┛\n\n`;
}

    // Send reply mentioning user
    await sendReply(sock, msg, message, [sender]);
  }
};
