const express = require("express");
const path = require("path");
const app = express();
var port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

var originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
var originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);
function parseEnvList(env) {
  if (!env) {
    return [];
  }
  return env.split(",");
}

// Set up rate-limiting to avoid abuse of the public CORS Anywhere server.
var checkRateLimit = require("./lib/rate-limit")(
  process.env.CORSANYWHERE_RATELIMIT
);

var cors_proxy = require("./lib/cors-anywhere");

const proxy = cors_proxy.createServer({
  originWhitelist: originWhitelist,
  originBlacklist: originBlacklist,
});

app.get("/proxy/:proxyUrl*", (req, res) => {
  req.url = req.url.replace("/proxy/", "/");
  proxy.emit("request", req, res);
});

//start server
app.listen(port, () => {
  console.log("Server started on port 3000!");
});
