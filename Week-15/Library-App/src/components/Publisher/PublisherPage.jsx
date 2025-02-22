import React, { useEffect, useState } from 'react';
import { getPublishers, addPublisher, updatePublisher, deletePublisher } from '../../api/publisherApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './PublisherPage.css';

const PublisherPage = () => { 
  // Yayıncıları, yeni yayıncıyı, düzenleme için seçilen yayıncıyı ve yayıncı detaylarının görünürlüğünü yönetmek için state değişkenleri
  const [publishers, setPublishers] = useState([]);
  const [newPublisher, setNewPublisher] = useState({
    name: "",
    establishmentYear: "",
    address: "",
  });
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [visibleDetails, setVisibleDetails] = useState({}); // Yayıncı detaylarının görünürlüğünü takip etme

  // Bileşen mount edildiğinde yayıncıları almak
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublishers();
      // Eğer yayıncı yoksa örnek yayıncıları ekle
      if (data.length === 0) {
        const samplePublishers = [
          { name: "Oxford University Press", establishmentYear: 1586, address: "Oxford, Birleşik Krallık"},
          { name: "Scholastic Corporation", establishmentYear: 1920, address: "New York, ABD" },
          { name: "Bloomsbury Publishing", establishmentYear: 1986, address: "Londra, Birleşik Krallık" },
          { name: "Springer Nature", establishmentYear: 1842, address: "Berlin, Almanya" },
          { name: "Cambridge University Press", establishmentYear: 1534, address: "Cambridge, Birleşik Krallık" }
        ];

        // Örnek yayıncıları veritabanına ekle
        for (const publisher of samplePublishers) {
          await addPublisher(publisher);
        }
        const updatedData = await getPublishers();
        setPublishers(updatedData);
        toast.info("Örnek yayıncılar başarıyla eklendi!");
      } else {
        setPublishers(data); // Veriler varsa, API'den gelen yayıncıları ayarla
      }
    };

    fetchData();
  }, []); // Boş bağımlılık dizisi ile sadece bileşen mount olduğunda çalışır

  const toggleDetails = (id) => {
    setVisibleDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Belirli bir yayıncının detaylarının görünürlüğünü değiştir
    }));
  };

  // Yeni bir yayıncı ekleme işlemi
  const handleAddPublisher = async () => {
    if (!newPublisher.name || !newPublisher.establishmentYear || !newPublisher.address) {
      toast.warn("Lütfen tüm alanları doldurun."); // Form eksikse uyarı göster
      return;
    }
    try {
      const addedPublisher = await addPublisher(newPublisher); // Yayıncıyı API'ye ekle
      setPublishers((prev) => [...prev, addedPublisher]);  // Yeni yayıncıyı listeye ekle
      setNewPublisher({ name: "", establishmentYear: "", address: "" }); // Giriş alanlarını sıfırla
      toast.success("Yayıncı başarıyla eklendi!", { autoClose: 3000 });
    } catch (err) {
      console.error("Yayıncı eklerken hata:", err);
      toast.error("Yayıncı eklenirken hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  // Var olan bir yayıncıyı güncelleme işlemi
  const handleUpdatePublisher = async () => {
    if (!selectedPublisher) {
      toast.error("Güncelleme için hiçbir yayıncı seçilmedi.");
      return;
    }

    if (!selectedPublisher.name || !selectedPublisher.establishmentYear || !selectedPublisher.address) {
      toast.warn("Kaydetmeden önce tüm alanları doldurduğunuzdan emin olun."); // Alanlar eksikse uyarı göster
      return;
    }

    try {
      const updatedData = { ...selectedPublisher };
      await updatePublisher(selectedPublisher.id, updatedData); // Yayıncıyı API'ye güncelle
      setPublishers((prevPublishers) =>
        prevPublishers.map((publisher) =>
          publisher.id === selectedPublisher.id ? selectedPublisher : publisher)// Yayıncı listesini güncelle
      ); 
      toast.success("Yayıncı başarıyla güncellendi!", { autoClose: 3000 });
      setSelectedPublisher(null); // Güncelleme sonrası seçilen yayıncıyı sıfırla
    } catch (err) {
      console.error("Yayıncı güncellenirken hata:", err);
      toast.error("Yayıncı güncellenirken hata oluştu.");
    }
  };

  // Bir yayıncıyı silme işlemi
  const handleDeletePublisher = async (id) => {
    if (window.confirm("Bu yayıncıyı silmek istediğinizden emin misiniz?")) {
      try {
        await deletePublisher(id); // Yayıncıyı API'den sil
        setPublishers((prev) => prev.filter((publisher) => publisher.id !== id)); // State'den çıkar
        toast.success('Yayıncı başarıyla silindi!');
      } catch (err) {
        console.error("Yayıncı silinirken hata:", err);
        toast.error('Yayıncı silinirken hata oluştu.');
      }
    }
  };

  return (
    <div className="publisher-container">
      <h1 className="publisher-header">Yayıncılar</h1>
      {publishers.map((publisher) => (
        <div key={publisher.id} className="publisher-row">
          <p className="publisher-name">{publisher.name}</p>
          <div className="button-group">
            {/* Yayıncı detaylarını koşullu olarak render et */}
            {visibleDetails[publisher.id] && (
              <div className="details">
                <p><strong>Yıl:</strong> {publisher.establishmentYear}</p>
                <p><strong>Adres:</strong> {publisher.address}</p>
              </div>
            )}
            <button onClick={() => toggleDetails(publisher.id)}>
              {visibleDetails[publisher.id] ? "Gizle" : "Detaylar"}
            </button>
            <button
              className="update-button"
              onClick={() => setSelectedPublisher(publisher)}
              aria-label="Yayıncıyı Güncelle"
            >
            <FaEdit size={20} /> {/* Düzenleme simgesi */}
          </button>
          <button
            className="delete-button"
            onClick={() => handleDeletePublisher(publisher.id)}
            aria-label="Yayıncıyı Sil"
          >
            <FaTrash size={20} /> {/* Çöp kutusu simgesi */}
          </button>
          </div>          
        </div>
      ))}

       {/* Seçilen yayıncıyı güncelleme formu */}
      {selectedPublisher && (
        <form className="publisher-form" onSubmit={(e) => { e.preventDefault(); handleUpdatePublisher(); }}>
          <input
            className="form-input"
            type="text"
            name="name"
            value={selectedPublisher.name}
            onChange={(e) => setSelectedPublisher({ ...selectedPublisher, name: e.target.value })}
          />
          <input
            className="form-input"
            type="number"
            name="establishmentYear"
            value={selectedPublisher.establishmentYear}
            onChange={(e) => setSelectedPublisher({ ...selectedPublisher, establishmentYear: e.target.value })}
          />
          <input
            className="form-input"
            type="text"
            name="address"
            placeholder="Adres"
            value={selectedPublisher?.address || ""}
            onChange={(e) => setSelectedPublisher({ ...selectedPublisher, address: e.target.value })}
          />
          <button className="form-button" type="submit">Kaydet</button>
        </form>
      )}

      {/* Yeni bir yayıncı ekleme formu */}
      <form className="publisher-form" onSubmit={(e) => { e.preventDefault(); handleAddPublisher(); }}>
        <input
          className="form-input"
          type="text"
          name="name"
          placeholder="İsim"
          value={newPublisher.name}
          onChange={(e) => setNewPublisher({ ...newPublisher, name: e.target.value })}
        />
        <input
          className="form-input"
          type="number"
          name="establishmentYear"
          placeholder="Kuruluş Yılı"
          value={newPublisher.establishmentYear}
          onChange={(e) => setNewPublisher({ ...newPublisher, establishmentYear: e.target.value })}
        />
        <input
          className="form-input"
          type="text"
          name="address"
          placeholder="Adres"
          value={newPublisher.address}
          onChange={(e) => setNewPublisher({ ...newPublisher, address: e.target.value })}
        />
        <button className="add-form-button" type="submit">Yayıncı Ekle</button>
      </form>
    </div>
  );
};

export default PublisherPage;
