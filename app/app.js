const express = require("express");
const app = express();

app.get("/", (_, res) => {
  res.json({ ok: true, service: "ci-cd-apprunner", ts: Date.now() });
});

app.listen(process.env.PORT || 8080);

