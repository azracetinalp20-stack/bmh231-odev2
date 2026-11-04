const http = require("http");

const sunucu = http.createServer((req, res) => {
    console.log(req.method, req.url);

    const url = new URL(req.url, "http://localhost:3000");
    console.log("Yol:", url.pathname);
    console.log("Tür:", url.searchParams.get("tur"));

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