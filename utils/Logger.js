const readline = require("readline");

class Logger {
    constructor() {
        // Using north america eastern time by default
        this.time = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" });
    };
  
    info(text) {
        console.log(`[INFO] [${this.time}] ${text}`);
    };
  
    warn(text) {
        console.log(`[WARN] [${this.time}] ${text}`);
    };
  
    error(text) {
        console.error(`[ERROR] [${this.time}] ${text}`);
    };
  
    write(text) {
        console.log(`[${this.time}] ${text}`);
    };
  
    async read(question) {
        // https://github.com/fnbrjs/fnbr.js/blob/master/src/client/index.js#L333
        const rl = readline.createInterface(process.stdin, process.stdout);
        return new Promise((res) => rl.question(`[${this.time}] ${question} `, (answer) => {
            rl.close(); res(answer);
        }));
    };
};

module.exports = new Logger();