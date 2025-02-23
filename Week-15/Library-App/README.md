# Kütüphane Yönetim Sistemi

Bu proje, bir kütüphane yönetim sistemi için frontend ve backend API'lerini içerir. Yazarlar, kitaplar, ödünç almalar, kategoriler ve yayıncılar için CRUD işlemlerini yönetir. Proje, React ve Axios kullanılarak geliştirilmiştir.

## Canlı Link :

**[Netlify Link](https://delightful-dieffenbachia-6c181a.netlify.app/)**


## Özellikler

- **Yazarlar**: Yazar ekleme, güncelleme, silme ve listeleme işlemleri.
- **Kitaplar**: Kitap ekleme, güncelleme, silme ve listeleme işlemleri.
- **Ödünç Almalar**: Kitap ödünç alma, iade etme ve ödünç almaları listeleme işlemleri.
- **Kategoriler**: Kategori ekleme, güncelleme, silme ve listeleme işlemleri.
- **Yayıncılar**: Yayıncı ekleme, güncelleme, silme ve listeleme işlemleri.
- **Navigasyon**: React Router ile sayfalar arası geçiş.

## Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

### Kurulum Adımları

1. Depoyu klonlayın:

   ```bash
   git clone https://github.com/kullanici-adiniz/proje-adiniz.git


2. Proje dizinine gidin:


cd proje-adiniz

3. Gerekli bağımlılıkları yükleyin :

    npm install
    veya
    yarn install

4. Projeyi çalıştırın:

    npm run dev

    veya 
    yarn dev

5. Tarayıcınızda http://localhost:5173 adresine giderek projeyi görüntüleyin.



## Kullanım

Proje, aşağıdaki sayfalardan oluşmaktadır:

### Anasayfa: 
Projenin genel tanıtımını ve öne çıkan kitapları gösterir.

### Yazarlar: 
Yazarları listeler, yeni yazar ekler, mevcut yazarları günceller veya siler.

### Kitaplar: 
Kitapları listeler, yeni kitap ekler, mevcut kitapları günceller veya siler.

### Ödünç Almalar: 
Ödünç alınan kitapları listeler, yeni ödünç alma işlemi ekler veya mevcut ödünç almaları günceller.

### Kategoriler: 
Kategorileri listeler, yeni kategori ekler, mevcut kategorileri günceller veya siler.

### Yayıncılar: 
Yayıncıları listeler, yeni yayıncı ekler, mevcut yayıncıları günceller veya siler.


## API Bağlantıları
Proje, aşağıdaki API endpoint'lerini kullanmaktadır:

### Yazarlar: 
http://localhost:8080/api/v1/authors

### Kitaplar: 
http://localhost:8080/api/v1/books

### Ödünç Almalar: 
http://localhost:8080/api/v1/borrows

### Kategoriler: 
http://localhost:8080/api/v1/categories

### Yayıncılar: 
http://localhost:8080/api/v1/publishers

## Katkıda Bulunma
Projeye katkıda bulunmak isterseniz, lütfen aşağıdaki adımları izleyin:

1. Fork işlemi yaparak projeyi kendi hesabınıza kopyalayın.

2. Yeni bir branch oluşturun:

    git checkout -b yeni-ozellik

3. Değişikliklerinizi yapın ve commit edin:

    git commit -m "Yeni özellik eklendi"

4. Değişikliklerinizi push edin:

    git push origin yeni-ozellik
5. Pull Request oluşturun.

## Lisans
Bu proje eğitim amacıyla açık kaynaklıdır.


## İletişim
Proje ile ilgili herhangi bir sorunuz veya öneriniz varsa, lütfen Linkedin veya GitHub üzerinden iletişime geçin.



 