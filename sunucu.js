const http = require("http");

const sunucu = http.createServer((req, res) => {
    console.log(req.method, req.url);

    if (req.method !== "GET") {
        res.writeHead(405, {
            "Content-Type": "text/plain; charset=utf-8",
            "Allow": "GET"
        });
        res.end("Bu yöntem desteklenmiyor");
        return;
    }

    res.end("calisiyor");
});

sunucu.listen(3000, () => {
    console.log("Sunucu 3000 portunda");
});