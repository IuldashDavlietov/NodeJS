import morgan from 'morgan';
import fs from 'node:fs'


const customLog = 'TIME=:data[clf] - URL=":url"'





export  default morgan(customLog, {
    stream:fs.createWriteStream('./exampleLogs.log', {flags: "a+"})
});