const express = require("express");
const path = require("path");
const app = express();
const { Octokit } = require("@octokit/core");
const dotenv = require("dotenv");
require("dotenv").config();

const { paginateRest } = require("@octokit/plugin-paginate-rest");

const MyOctokit = Octokit.plugin(paginateRest);

const octokit = new MyOctokit();

dotenv.config();
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

var cors_proxy = require("./lib/cors-anywhere");

const proxy = cors_proxy.createServer({
  originWhitelist: originWhitelist,
  originBlacklist: originBlacklist,
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [], // Do not remove any headers.
});

app.get("/proxy/:proxyUrl*", (req, res) => {
  req.url = req.url.replace("/proxy/", "/");
  proxy.emit("request", req, res);
});

//start server
app.listen(port, () => {
  console.log("Server started on port 3000!");
});

app.get("/repos", async (_, res) => {
  try {
    const response = await octokit.paginate("GET /orgs/uclaacm/repos", {
      per_page: 100,
    });

    const result = new Map();
    result.set("no-topic", []);

    for (let obj of response) {
      if (obj.homepage) {
        if (obj.topics.length) {
          for (let topic of obj.topics) {
            if (result.has(topic))
              result.set(topic, [...result.get(topic), obj.homepage]);
            else result.set(topic, [obj.homepage]);
          }
        } else {
          result.set("no-topic", [...result.get("no-topic"), obj.homepage]);
        }
      }
    }
    return res.status(200).json(Object.fromEntries(result));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
