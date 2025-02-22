import React from 'react';
import './HomePage.css'; // Stil için CSS'i içe aktar

const HomePage = () => {
    return (
        <div className='home-page'>
            <h1>📚 Kütüphane Yönetim Sistemi</h1>
            <p>
                Kütüphane Yönetim Sistemi'ne hoş geldiniz, kütüphanenizin kitap, yazar, kategori ve yayınevleri koleksiyonunu düzenlemek ve yönetmek için başvurabileceğiniz uygulamanız. 
            </p>
            <p>İster bir kütüphaneci ister bir kitap meraklısı olun, bu araç kütüphane yönetiminizi sorunsuz ve verimli hale getirecek şekilde tasarlandı.</p>

            {/* İçerik bölümü */}
            <div className="content">
                <h2>📖 Öne Çıkan Kitaplar</h2>
                <p>
                    Öne çıkan koleksiyonumuzu keşfedin, envanteri yönetin ve bu harika kitapları hayata geçiren yazarlar ve yayınevleriyle ilgili bilgileri takip edin.
                </p>
                Sadece birkaç tıklama ile kayıtları güncelleyebilir, yeni başlıklar ekleyebilir veya eski girişleri silerek kütüphanenizi güncel tutabilirsiniz.
                <p>

                </p>
            </div>
        </div>
    );
};

export default HomePage;
