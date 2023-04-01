const fs = require("fs");

exports.writeStream = fs.createWriteStream("./log/requsts.log", { flags: "a" });
