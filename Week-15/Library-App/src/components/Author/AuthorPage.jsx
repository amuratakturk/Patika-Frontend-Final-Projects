import React, { useEffect, useState } from 'react';
import { getAuthors, addAuthor, updateAuthor, deleteAuthor } from '../../api/authorApi';
import { toast } from 'react-toastify';
import './AuthorPage.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AuthorPage = () => {
  // Yazar listesini saklamak için state
  const [authors, setAuthors] = useState([]);
  // Yeni yazar form verilerini saklamak için state
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    birthDate: "",
    country: "",
  });
  // Düzenlenen yazarı saklamak için state
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  // Yazar detaylarının görünürlüğünü kontrol eden state
  const [visibleDetails, setVisibleDetails] = useState({});

  // Bileşen yüklendiğinde veritabanından yazarları al
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAuthors(); // API çağrısı ile yazarları al

      // Eğer yazar bulunamazsa örnek yazarları ekle
      if (data.length === 0) {
        const sampleAuthors = [
          { name: "Fyodor Dostoyevski", birthDate: "1821-11-11", country: "Rusya" },
          { name: "Virginia Woolf", birthDate: "1882-01-25", country: "Birleşik Krallık" },
          { name: "Leo Tolstoy", birthDate: "1828-09-09", country: "Rusya" },
          { name: "Jane Austen", birthDate: "1775-12-16", country: "Birleşik Krallık" },
          { name: "Franz Kafka", birthDate: "1883-07-03", country: "Çekya" }
        ];

        // Örnek yazarları veritabanına ekle
        for (const author of sampleAuthors) {
          await addAuthor(author);
        }

        // Yeni eklenen yazarları tekrar al ve state'e kaydet
        const updatedData = await getAuthors();
        setAuthors(updatedData); // Güncellenmiş yazar listesini state'e ekle
      } else {
        setAuthors(data);
      }
    };

    fetchData();
  }, []); // Boş bağımlılık dizisi, bu effect'in yalnızca bileşen yüklendiğinde çalışmasını sağlar

  // Yazar detaylarının görünürlüğünü aç/kapat
  const toggleDetails = (id) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [id]: !prev[id], // Tıklanan yazarın detaylarını aç/kapat
    }));
  };

  // Yeni bir yazar ekleme işlemi
  const handleAddAuthor = async () => {
    try {
      const addedAuthor = await addAuthor(newAuthor); // API ile yeni yazarı ekle
      setAuthors((prev) => [...prev, addedAuthor]); // Yeni yazarı listeye ekle
      setNewAuthor({ name: "", birthDate: "", country: "" }); // Formu sıfırla
      toast.success("Yazar başarıyla eklendi!", { autoClose: 3000 }); // Başarı mesajı göster
    } catch (err) {
      console.error("Yazar eklenirken hata oluştu:", err);
      toast.error("Yazar eklenemedi. Lütfen tekrar deneyin.");
    }
  };

  // Mevcut bir yazarı güncelleme işlemi
  const handleUpdateAuthor = async () => {
    try {
      await updateAuthor(selectedAuthor.id, selectedAuthor); // API ile yazarı güncelle
      toast.success("Yazar başarıyla güncellendi!", { autoClose: 3000 });

      // Güncellemeden sonra yazar listesini güncelle
      setAuthors((prevAuthors) =>
        prevAuthors.map((author) =>
          author.id === selectedAuthor.id ? selectedAuthor : author
        )
      );
      setSelectedAuthor(null); // Seçili yazarı sıfırla
    } catch (err) {
      console.error("Yazar güncellenirken hata oluştu:", err);
      toast.error("Yazar güncellenirken hata oluştu.");
    }
  };

  // Yazar silme işlemi
  const handleDeleteAuthor = async (id) => {
    if (window.confirm("Bu yazarı silmek istediğinizden emin misiniz?")) {
      try {
        await deleteAuthor(id); // API ile yazarı sil
        setAuthors((prev) => prev.filter((author) => author.id !== id)); // Silinen yazarı listeden çıkar
        toast.success("Yazar başarıyla silindi!");
      } catch (err) {
        console.error("Yazar silinirken hata oluştu:", err);
        toast.error("Yazar silinirken hata oluştu.");
      }
    }
  };

  return (
    <div className='author-container'>
      <h1 className='author-header'>Yazarlar</h1>
      {authors.map((author) => (
        <div key={author.id} className="author-row">
          <p className="author-name">{author.name}</p>
          <div className="button-group">
            {visibleDetails[author.id] && (
              <div className="details">
                <p><strong>Doğum Tarihi:</strong> {author.birthDate}</p>
                <p><strong>Ülke:</strong> {author.country}</p>
              </div>
            )}
            <button onClick={() => toggleDetails(author.id)}>
              {visibleDetails[author.id] ? "Gizle" : "Detaylar"}
            </button>
            {/* Güncelleme ve silme butonları */}
            <button
              className="update-button"
              onClick={() => setSelectedAuthor(author)}
              aria-label="Yazarı Güncelle"
            >
              <FaEdit size={20} /> {/* Düzenleme ikonu */}
            </button>
            <button
              className="delete-button"
              onClick={() => handleDeleteAuthor(author.id)}
              aria-label="Yazarı Sil"
            >
              <FaTrash size={20} /> {/* Çöp kutusu ikonu */}
            </button>
          </div>
        </div>
      ))}

      {/* Yazar güncelleme formu */}
      {selectedAuthor && (
        <form className="author-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateAuthor(); // Güncelleme işlemini gerçekleştir
          }}
        >
          <input className="form-input"
            type="text"
            name="name"
            placeholder='Ad'
            value={selectedAuthor.name}
            onChange={(e) =>
              setSelectedAuthor({ ...selectedAuthor, name: e.target.value })
            }
          />
          <input className="form-input"
            type="date"
            name="birthDate"
            placeholder='Doğum Tarihi'
            value={selectedAuthor.birthDate}
            onChange={(e) =>
              setSelectedAuthor({ ...selectedAuthor, birthDate: e.target.value })
            }
          />
          <input className="form-input"
            type="text"
            name="country"
            placeholder='Ülke'
            value={selectedAuthor.country}
            onChange={(e) =>
              setSelectedAuthor({ ...selectedAuthor, country: e.target.value })
            }
          />
          <button className="form-button" type="submit">Kaydet</button>
        </form>
      )}

      {/* Yeni yazar ekleme formu */}
      <form className="author-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddAuthor(); // Yeni yazar ekleme işlemi
        }}
      >
        <input className="form-input"
          type="text"
          name="name"
          placeholder='Ad'
          value={newAuthor.name}
          onChange={(e) =>
            setNewAuthor({ ...newAuthor, name: e.target.value })
          }
        />
        <input className="form-input"
          type="date"
          name="birthDate"
          placeholder='Doğum Tarihi'
          value={newAuthor.birthDate}
          onChange={(e) =>
            setNewAuthor({ ...newAuthor, birthDate: e.target.value })
          }
        />
        <input className="form-input"
          type="text"
          name="country"
          placeholder='Ülke'
          value={newAuthor.country}
          onChange={(e) =>
            setNewAuthor({ ...newAuthor, country: e.target.value })
          }
        />
        <button className="add-form-button" type="submit">Yazar Ekle</button>
      </form>
    </div>
  );
};

export default AuthorPage;
