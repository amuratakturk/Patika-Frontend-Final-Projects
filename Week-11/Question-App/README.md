## LIVE PROJECT

**[Netlify Link](https://venerable-torrone-39c073.netlify.app/)**


# Question-App

## Proje Açıklaması
Bu proje, kullanıcıların çoktan seçmeli bir test çözmelerine olanak sağlayan bir React tabanlı bir uygulamadır. Kullanıcı, belirli bir zaman dilimi içinde sorulara cevap verir ve test tamamlandığında sonuç ekranında doğru, yanlış ve boş cevapları görebilir.

---

## Özellikler
- **Test Başlatma**: Test başlamadan önce kullanıcı bilgilendirilir.
- **Zamanlayıcı**: Her soru için kullanıcıya 30 saniye süre tanınır ve seçenekler 4 saniye sonra görünür.
- **Doğru, Yanlış ve Boş Cevap Analizi**: Test tamamlandığında sonuç ekranında detaylı analiz sağlanır.
- **Medya Destekli Sorular**: Sorulara görsel ekleme imkânı vardır.

---

## Kurulum

### Gerekli Araçlar
- Node.js
- NPM veya Yarn
- Bir kod editörü (Örneğin: Visual Studio Code)

### Adımlar
1. Bu projeyi klonlayın:
    ```bash
    git clone https://github.com/kullanici/question-app.git
    ```
2. Proje dizinine gidin:
    ```bash
    cd question-app
    ```
3. Gerekli bağımlılıkları yükleyin:
    ```bash
    npm install
    ```
4. Uygulamayı çalıştırın:
    ```bash
    npm run dev
    ```

---

## Kullanım
1. Uygulama çalıştığında, kullanıcıya hoş geldiniz mesajı gösterilir.
2. **Teste Başla** butonuna tıklayarak testi başlatabilirsiniz.
3. Her soru için 30 saniyeniz vardır. Seçenekler, soru gösterildikten 4 saniye sonra aktif hale gelir.
4. Sorular tamamlandığında sonuç ekranında analizlerinizi görebilirsiniz.

---

## Teknolojiler

- **React.js**: UI geliştirme için
- **CSS**: Stiller için
- **Vite**: Hızlı geliştirme ortamı için

---

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Projeyi geliştirmek için aşağıdaki adımları takip edebilirsiniz:

1. Bir `fork` oluşturun.
2. Yeni bir özellik dalı (`feature-branch`) açın.
3. Yaptığınız değişiklikleri `commit` edin.
4. Dalınızı bu repoya gönderin (`push`).
5. Bir `pull request` oluşturun.

---

## Lisans

Bu proje eğitim amacıyla açık kaynaklıdır.

---

## Dosya ve Klasör Yapısı
```plaintext
.
├── src
│   ├── components
│   │   ├── Question.jsx        # Soru ekranını yönetir
│   │   └── ResultScreen.jsx    # Sonuç ekranını yönetir
│   ├── data
│   │   └── questions.js        # Soruların bulunduğu veri dosyası
│   ├── App.jsx                 # Ana uygulama bileşeni
│   ├── index.css               # Global stiller
│   └── main.jsx                # Uygulama başlangıç noktası
├── public
│   └── index.html              # HTML template
└── package.json                # Bağımlılıklar ve proje ayarları
