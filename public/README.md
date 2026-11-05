# Kampüs Etkinlik Panosu

BMH231 Web Programlama Ödev 2. Kampüsteki etkinlikleri listeleyen, türe ve başlığa göre süzülebilen küçük bir web uygulaması. Ön yüz HTML, CSS ve JavaScript ile, sunucu yalnızca Node.js'in http, fs ve path modülleriyle yazıldı.

## Kurulum ve çalıştırma

    git clone https://github.com/azracetinalp20-stack/bmh231-odev2.git
    cd bmh231-odev2
    npm start

Ardından tarayıcıda http://localhost:3000 adresini açın.

## API uç noktaları

| Yöntem | Yol | Durum | Açıklama |
|---|---|---|---|
| GET | /api/etkinlikler | 200 | Tüm etkinlikler |
| GET | /api/etkinlikler?tur=atolye | 200 | Türe göre süzülmüş liste |
| GET | /api/etkinlikler/3 | 200 / 404 | Tek etkinlik / bulunamadı |
| GET dışındaki yöntemler | herhangi | 405 | Allow: GET başlığı |

## Ekran görüntüsü

![Ana sayfa](ekran/B3-1280.png)