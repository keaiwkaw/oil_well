const express = require("express");
const server = express();
//the cores config
server.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS"
    );

    if (req.method == "OPTIONS") {
        res.send(200);
        /make the require of options turn back quickly/;
    } else {
        next();
    }
});
server.use(express.static("./dist"));
server.get("/", (req, res) => {
    res.end("./dist/index.html");
});
server.listen(8888, () => {
    console.log("正在监听8888端口");
});
