const fetch = require("node-fetch");
const fs = require("fs");
const logger = require("./Logger.js");

class Auth {
    constructor() {
        this.base = "https://account-public-service-prod.ol.epicgames.com/account/api";
    };

    async checkDeviceAuth(auth) {
        const res = await fetch(`${this.base}/oauth/token`, {
            method: "POST",
            headers: {
                "Authorization": "basic MzQ0NmNkNzI2OTRjNGE0NDg1ZDgxYjc3YWRiYjIxNDE6OTIwOWQ0YTVlMjVhNDU3ZmI5YjA3NDg5ZDMxM2I0MWE=",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=device_auth&account_id=${auth.accountId}&device_id=${auth.deviceId}&secret=${auth.secret}`
        });
        if (res.status == 200) return auth;
        throw new Error("Invalid device auth provided!");
    };
  
    async createDeviceAuth(path) {
        const auth = await this.authorizationCode();
        
        const res = await fetch(`${this.base}/public/account/${auth.account_id}/deviceAuth`, {
            method: "POST",
            headers: {
               Authorization: `bearer ${auth.access_token}` 
            }
        });
        const data = await res.json();
      
        const deviceAuth = { accountId: data.accountId, deviceId: data.deviceId, secret: data.secret };
        fs.writeFile(path, JSON.stringify(deviceAuth, null, 2), err => {
            if (err) {
                logger.error(err);
                return;
            } else {
                logger.info("Device auth successfully created!");
            };
        });
      
        return deviceAuth;
    };
  
    async authorizationCode() {
        const auth = await logger.read("Please enter a valid authorization code:");
        const res = await fetch(`${this.base}/oauth/token`, {
            method: "POST",
            headers: {
                "Authorization": "basic MzQ0NmNkNzI2OTRjNGE0NDg1ZDgxYjc3YWRiYjIxNDE6OTIwOWQ0YTVlMjVhNDU3ZmI5YjA3NDg5ZDMxM2I0MWE=",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=authorization_code&code=${auth}`
        });
        const data = await res.json();
      
        if (res.status == 200) return data;
        logger.error("Invalid device authorization code provided!");
    };
};

module.exports = new Auth();