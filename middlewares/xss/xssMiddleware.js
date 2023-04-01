const xss = require("xss");

function xssMiddleware(req, res, next) {
  for (let key in req.body) {
    req.body[key] = xss(req.body[key]);
  }
  next();
}

module.exports = xssMiddleware;
