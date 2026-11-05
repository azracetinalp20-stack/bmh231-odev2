const http = require("http");
const fs = require("fs");
const path = require("path");

const PUBLIC = path.join(__dirname, "public");

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

    if (url.pathname.startsWith("/api/etkinlikler/")) {
        const parcalar = url.pathname.split("/");
        const id = Number(parcalar[3]);
        const metin = fs.readFileSync("etkinlikler.json", "utf-8");
        const etkinlikler = JSON.parse(metin);
        const etkinlik = etkinlikler.find((e) => e.id === id);
        if (etkinlik) {
            res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify(etkinlik));
        } else {
            res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify({ hata: "Etkinlik bulunamadı" }));
        }
        return;
    }

    let istenen = url.pathname;
    if (istenen === "/") {
        istenen = "/index.html";
    }
    const dosyaYolu = path.join(PUBLIC, istenen);

    if (!dosyaYolu.startsWith(PUBLIC)) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Bulunamadı");
        return;
    }

    const turler = {
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "text/javascript; charset=utf-8"
    };
    const uzanti = path.extname(dosyaYolu);

    fs.readFile(dosyaYolu, (hata, icerik) => {
        if (hata) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Bulunamadı");
            return;
        }
        res.writeHead(200, { "Content-Type": turler[uzanti] || "application/octet-stream" });
        res.end(icerik);
    });
});

sunucu.listen(3000, () => {
    console.log("Sunucu 3000 portunda");
});