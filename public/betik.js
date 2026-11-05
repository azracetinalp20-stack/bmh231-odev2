const kartlarKutusu = document.getElementById("kartlar");
const durumYazisi = document.getElementById("durum");
const aramaKutusu = document.getElementById("arama");
const dugmeler = document.querySelectorAll(".filtre");

let etkinlikler = [];
let seciliTur = "tumu";
let aramaMetni = "";

const turAdlari = {
    atolye: "Atölye",
    soylesi: "Söyleşi",
    topluluk: "Topluluk"
};

function kartYap(e) {
    const kart = document.createElement("article");
    kart.className = "kart";

    const baslik = document.createElement("h3");
    baslik.textContent = e.baslik;

    const tarih = document.createElement("p");
    tarih.textContent = "Tarih: " + new Date(e.tarih).toLocaleDateString("tr-TR");

    const yer = document.createElement("p");
    yer.textContent = "Yer: " + e.yer;

    const kontenjan = document.createElement("p");
    kontenjan.textContent = "Kontenjan: " + e.kontenjan;

    const etiket = document.createElement("span");
    etiket.className = "etiket";
    etiket.textContent = turAdlari[e.tur] || e.tur;

    kart.append(baslik, tarih, yer, kontenjan, etiket);
    return kart;
}

function ciz(liste) {
    kartlarKutusu.textContent = "";

    if (liste.length === 0) {
        durumYazisi.textContent = "Aramanıza uygun etkinlik yok.";
        return;
    }

    durumYazisi.textContent = "";
    liste.forEach((e) => {
        kartlarKutusu.append(kartYap(e));
    });
}

function filtrele() {
    const sonuc = etkinlikler.filter((e) => {
        const turUyuyor = seciliTur === "tumu" || e.tur === seciliTur;
        const aramaUyuyor = e.baslik.toLowerCase().includes(aramaMetni.toLowerCase());
        return turUyuyor && aramaUyuyor;
    });
    ciz(sonuc);
}

dugmeler.forEach((dugme) => {
    dugme.addEventListener("click", () => {
        dugmeler.forEach((d) => d.classList.remove("secili"));
        dugme.classList.add("secili");
        seciliTur = dugme.dataset.tur;
        filtrele();
    });
});

aramaKutusu.addEventListener("input", () => {
    aramaMetni = aramaKutusu.value;
    filtrele();
});

async function etkinlikleriYukle() {
    durumYazisi.textContent = "Yükleniyor...";
    try {
        const yanit = await fetch("/api/etkinlikler");
        if (!yanit.ok) {
            throw new Error("Sunucu hatası: " + yanit.status);
        }
        etkinlikler = await yanit.json();
        filtrele();
    } catch (hata) {
        durumYazisi.textContent = "Etkinlikler yüklenemedi. Lütfen daha sonra tekrar deneyin.";
        console.error(hata);
    }
}

etkinlikleriYukle();