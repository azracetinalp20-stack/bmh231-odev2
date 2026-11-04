const http = require("http");
const fs = require("fs");

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

    if (url.pathname === "/api/etkinlikler") {
        const metin = fs.readFileSync("etkinlikler.json", "utf-8");
        const etkinlikler = JSON.parse(metin);
        const tur = url.searchParams.get("tur");
        let sonuc = etkinlikler;
        if (tur) {
            sonuc = etkinlikler.filter((e) => e.tur === tur);
        }
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(sonuc));
        return;
    }

    res.end("calisiyor");
});

sunucu.listen(3000, () => {
    console.log("Sunucu 3000 portunda");
});