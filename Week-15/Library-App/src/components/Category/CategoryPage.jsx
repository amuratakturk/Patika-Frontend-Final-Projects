import React, { useEffect, useState } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../api/categoryApi';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './CategoryPage.css'; // Stil için CSS dosyasını içe aktar

const CategoryPage = () => {
  const [categories, setCategories] = useState([]); // Kategorileri saklamak için state
  const [newCategory, setNewCategory] = useState({ name: '', description: '' }); // Yeni kategori eklemek için state
  const [selectedCategory, setSelectedCategory] = useState(null); // Güncellenmek için seçilen kategoriye ait state
  const [visibleDetails, setVisibleDetails] = useState({}); // Detayların görünürlüğünü takip etmek için

  // Bileşen yüklendiğinde API'den kategorileri al
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories(); // API'den kategorileri al
      if (data.length === 0) {
        // Eğer kategori yoksa, bazı örnek kategoriler ekle
        const sampleCategories = [
          { name: 'Psikoloji', description: 'İnsan zihni ve davranışları üzerine kitaplar' },
          { name: 'Sanat', description: 'Resim, heykel ve diğer sanat dallarıyla ilgili eserler' },
          { name: 'Edebiyat', description: 'Klasik ve modern edebi eserler' },
          { name: 'Ekonomi', description: 'Finans, iş dünyası ve ekonomi üzerine kitaplar' },
          { name: 'Mitoloji', description: 'Antik mitler ve efsaneler hakkında eserler' }
        ];
        for (const category of sampleCategories) {
          await addCategory(category); // Örnek kategorileri ekle
        }
        const updatedData = await getCategories();
        setCategories(updatedData);  // Kategorileri güncelle
      } else {
        setCategories(data); // Kategoriler varsa, onları state'e aktar
      }
    };
    fetchCategories(); // fetchCategories fonksiyonunu bileşen yüklendiğinde çağır
  }, []);

  // Kategori detaylarının görünürlüğünü değiştir
  const toggleDetails = (id) => {
    setVisibleDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Seçilen kategori için görünürlüğü değiştir
    }));
  };

   // Yeni kategori ekle
  const handleAddCategory = async () => {
    try {
      const addedCategory = await addCategory(newCategory); // API'yi çağırarak kategori ekle
      setCategories((prev) => [...prev, addedCategory]);  // Yeni kategoriyi listeye ekle
      setNewCategory({ name: '', description: '' }); // Formu sıfırla
      toast.success('Kategori başarıyla eklendi!');  // Başarı mesajı göster
    } catch (err) {
      console.error('Kategori eklenirken hata:', err); // Hata durumunda hatayı logla
      toast.error('Kategori eklenemedi.');// Hata mesajı göster
    }
  };

  // Seçilen kategoriyi güncelle
  const handleUpdateCategory = async () => {
    try {
      await updateCategory(selectedCategory.id, selectedCategory); // API'yi çağırarak kategori güncelle
      setCategories((prev) =>
        prev.map((category) =>
          category.id === selectedCategory.id ? selectedCategory : category
        )
      );  // Kategori listesini güncelle
      setSelectedCategory(null); // Kategoriyi seçimi kaldır
      toast.success('Kategori başarıyla güncellendi!'); // Başarı mesajı göster
    } catch (err) {
      console.error('Kategori güncellenirken hata:', err); // Hata durumunda hatayı logla
      toast.error('Kategori güncellenemedi.'); // Hata mesajı göster
    }
  };

  // Bir kategoriyi sil
  const handleDeleteCategory = async (id) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      try {
        await deleteCategory(id); // API'yi çağırarak kategori sil
        setCategories((prev) => prev.filter((category) => category.id !== id)); // Silinen kategoriyi listeden çıkar
        toast.success('Kategori başarıyla silindi!'); // Başarı mesajı göster
      } catch (err) {
        console.error('Kategori silinirken hata:', err); // Hata durumunda hatayı logla
        toast.error('Kategori silinemedi.'); // Hata mesajı göster
      }
    }
  };

  return (
    <div className="category-container">
      <h1 className="category-header">Kategoriler</h1>
      {/* Her kategoriyi görüntüle */}
      {categories.map((category) => (
        <div key={category.id} className="category-row">
          <p className="category-name">{category.name}</p>
          <div className="button-group"> 
            {/* Kategori detaylarını görünür yap */}
            {visibleDetails[category.id] && (
              <div className="details">
                <p><strong>Açıklama:</strong> {category.description}</p>
              </div>
            )}   
          <button  onClick={() => toggleDetails(category.id)}>            
              {visibleDetails[category.id] ? "Gizle" : "Detaylar"}
            </button>
            {/* Düzenle ve Sil butonları */}       
            <button
              className="update-button"
              onClick={() => setSelectedCategory(category)}
              aria-label="Kategoriyi Güncelle"
            >
            <FaEdit size={20} /> {/* Düzenleme ikonu */}
          </button>
          <button
            className="delete-button"
            onClick={() => handleDeleteCategory(category.id)}
            aria-label="Kategoriyi Sil"
          >
            <FaTrash size={20} /> {/* Çöp kutusu ikonu */}
          </button>            
          </div>          
        </div>
      ))}

      {/* Kategori Güncelleme Formu */}
      {selectedCategory && (
        <form className="category-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateCategory();
          }}
        >
          <input
            className="form-input"
            type="text"
            name="name"
            value={selectedCategory.name}
            onChange={(e) =>
              setSelectedCategory({ ...selectedCategory, name: e.target.value })
            }
          />
          <input
            className="form-input"
            type="text"
            name="description"
            value={selectedCategory.description}
            onChange={(e) =>
              setSelectedCategory({
                ...selectedCategory,
                description: e.target.value,
              })
            }
          />
          <button className="form-button" type="submit">Kaydet</button>
        </form>
      )}

      {/* Yeni Kategori Ekleme Formu */}
      <form className="author-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddCategory();
        }}
      >
        <input
          className="form-input"
          type="text"
          name="name"
          placeholder="Ad"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <input
          className="form-input"
          type="text"
          name="description"
          placeholder="Açıklama"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
        />
        <button className="add-form-button" type="submit">Kategori Ekle</button>
      </form>
    </div>
  );
};

export default CategoryPage;