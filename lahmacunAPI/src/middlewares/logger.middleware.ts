// Logger
// $ npm i morgan
// $ npm i -D @types/morgan
// $ https://expressjs.com/en/resources/middleware/morgan.html

import fs from "node:fs";
import morgan from "morgan";

const customLog =
  'TIME=":date[iso]" - URL=":url" - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)';
const now = new Date();
const today = now.toISOString().split("T")[0];

// createWriteStream can't create a folder, so make sure ./logs exists.
fs.mkdirSync("./logs", { recursive: true });

export default morgan(customLog, {
  stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
});
