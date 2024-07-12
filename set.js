const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0JOSFA5am9yMGhGdnprTzBHMjdnVFlhNlJEdldqeC9VQldiQi9Kb3VIQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiemlvZnNBazFoUVpLajg5ZW9zNjgwM2duWDZEdk5sdGZBMDNtcGxDeU1Rdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZT2dTRVU3WU5qbGxEL20wZVpIaWtQUEczN0ZTMjlvMDAzYkVMSDY0aUdJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxZ1FqSEt5U2NSMHp1MEEzYjVUcnlTRFI1djEwRkd3TGo2aU10VDlOSWk0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlLTkdZTFNMdXlJUEZxUDc3d1ZRRmNXNHlyYTgvd0R4eitHeU1pcERCbGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtHblZ0UytYd0haMGRzdFVtNHJLK1RnM0JkeU1lMitlbU5obnRYci9lR0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUtvRXROK0hSMmFkM3gzV1F5WVZkWjFtd0paWkhJYXVDQnB6QWxKdEpsbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib29hMWNXNktuem9wd1IvUWRoSlJ6Y0ZXVTZMUjlBZzZmVCtJQkdOL2JpMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNLRCtuWi9RdjNUU2Q1QUdWZ1RVOXV4ZTlaU3Rmc1FRbmltZTk3YUE5NkVYV1Q3T1RlRFZWWTdpY3RKNzZnUDVWTGg5NTRWalp3S1RhY3dyYklIMmlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI2LCJhZHZTZWNyZXRLZXkiOiJEVnVsWC9JamJ3cXJlMjl2NXVsQTdSYUpKMGNNTEtUTk5Hb2J0bEkzMDA0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ3OTFKTUxXT1ItR3F3UWFjbTRoNlVBIiwicGhvbmVJZCI6IjU1MjY5MzMwLWExOTctNDcwOC05MmY0LWZkYTM0NDA1NDM3OCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPK1VyWTJLVGhsU0k2MnNzSnBxQzhQSmJrQk09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidmluOW1vNDVZMWZNbzYvaUJsZFVGQm9sRmRNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpTV1dENjMzIiwibWUiOnsiaWQiOiIyMzQ5MDc2MzYyODE4OjIzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKU1E0TWNGRUwrZHZyUUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJJMlFjaEUrVDRkOG9yR0NZMUNmWlZnVldCZWtWbFFVRHVPVkpGeFlRcFU0PSIsImFjY291bnRTaWduYXR1cmUiOiJnV3F4c2JsL3kxeXhVUnlNMUM2TzFpQW1kR003aEsrazgwcFVoZ2E3UkpCOHBuUE5jOWZ1cVBLQWxmanB6ZlFFb210OTl2YkJualN3VDRabDNvN0pDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiY0JnZEdCQ01Jd2VoMkMzRm1Yc3dMdnkvSmNOdVpUWm04Nmx0RlNra2J3VFJjanVaZVdjS2lCdkpUdmNjNk9SQ0FiZlZUMGNPaVVjR2VubTM5TnA5aUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDc2MzYyODE4OjIzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNOa0hJUlBrK0hmS0t4Z21OUW4yVllGVmdYcEZaVUZBN2psU1JjV0VLVk8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjA2ODQyMzh9',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "itz chinedu",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2349076362818", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
