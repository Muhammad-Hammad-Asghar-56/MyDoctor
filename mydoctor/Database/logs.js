const { query } = require("express");
const connection = require("../Database/index");
const requestIp = require('request-ip')

function accessLog(req) {
    var clientIp = requestIp.getClientIp(req)
    const query = "INSERT INTO accessLog (ip) values(?)"
    connection.query(query, [clientIp], (err, results) => {
        if (err) {
            console.error(err);
            return null;
        }
        console.log(results);
    });
    return true;
}

function isIpBlocked(ip) {
   const query = "SELECT time FROM blockIps WHERE ip = ? AND time >= NOW() - INTERVAL 30 MINUTE";  
    return new Promise((resolve, reject) => {
    connection.query(query, [ip], (err, results) => {
        if (err) {
            console.error(err);
            reject(null);
        } else {
            if (results.length > 0) {
                const blockedUntil = new Date(results[0].time);
                blockedUntil.setMinutes(blockedUntil.getMinutes() + 30);
                console.log("Blocked until:", blockedUntil);
                resolve(blockedUntil)
            }
        }
        resolve(null)
    });})
}
module.exports = { accessLog, isIpBlocked }