const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "error" }),
    new winston.transports.File({ filename: "./log/info.log", level: "info" }),
    new winston.transports.File({
      filename: "./log/errors.log",
      level: "error",
    }),
  ],
});

module.exports = logger;

// logger.info("It was an info level");
// logger.error("It was an error level");
// logger.warn("it is a warning message");
