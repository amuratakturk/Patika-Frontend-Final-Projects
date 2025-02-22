import React, { useState, useEffect } from "react";
import { getBooks, addBook, deleteBook, updateBook } from "../../api/bookApi"; // Kitapları getirmek, eklemek, güncellemek ve silmek için API çağrıları
import { getAuthors } from "../../api/authorApi"; // Yazarları getirmek için API çağrısı
import { getPublishers } from "../../api/publisherApi"; // Yayınevlerini getirmek için API çağrısı
import { getCategories } from "../../api/categoryApi"; // Kategorileri getirmek için API çağrısı
import { toast } from "react-toastify"; // Bildirim göstermek için
import "./BookPage.css"; // Bu sayfa için CSS stil dosyasını içe aktar
import { FaEdit, FaTrash } from "react-icons/fa"; // Düzenle ve sil butonları için simgeleri içe aktar

const AddBook = () => {
  const [books, setBooks] = useState([]); // Kitapların listesini saklamak için state
  const [authors, setAuthors] = useState([]); // Yazarların listesini saklamak için state
  const [publishers, setPublishers] = useState([]); // Yayınevlerinin listesini saklamak için state
  const [categories, setCategories] = useState([]); // Kategorilerin listesini saklamak için state
  const [editingBook, setEditingBook] = useState(null); // Düzenlenen kitabı saklamak için state
  const [newBook, setNewBook] = useState({
    name: "",
    publicationYear: "",
    stock: "",
    authorId: "",
    publisherId: "",
    categoryIds: [],
  }); // Yeni veya düzenlenen kitabın verilerini saklamak için state

  // Bileşen yüklendiğinde kitapları, yazarları, yayınevlerini ve kategorileri getir
  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await getBooks(); // Kitapları API'den getir
        setBooks(booksResponse); // Getirilen kitapları state'e kaydet
        const authorsResponse = await getAuthors(); // Yazarları API'den getir
        setAuthors(authorsResponse); // Getirilen yazarları state'e kaydet
        const publishersResponse = await getPublishers(); // Yayınevlerini API'den getir
        setPublishers(publishersResponse); // Getirilen yayınevlerini state'e kaydet
        const categoriesResponse = await getCategories(); // Kategorileri API'den getir
        setCategories(categoriesResponse); // Getirilen kategorileri state'e kaydet
      } catch (error) {
        console.error("Veri getirilirken hata oluştu:", error);  // Veri getirilirken oluşan hataları logla
        toast.error("Veri getirilirken hata oluştu"); // Hata bildirimi göster
      }
    };
    fetchData(); // Veri getirme fonksiyonunu çağır
  }, []); // Boş bağımlılık dizisi, bu efekti yalnızca bileşen yüklendiğinde bir kez çalıştırır

  // Yeni bir kitap eklemeyi işle
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gerekli alanların doldurulup doldurulmadığını kontrol et
    if (
      !newBook.name ||
      !newBook.publicationYear ||
      !newBook.stock ||
      !newBook.authorId ||
      !newBook.publisherId ||
      !newBook.categoryIds.length
    ) {
      toast.warn("Lütfen tüm gerekli alanları doldurun"); // Eksik alanlar varsa uyarı bildirimi göster
      return;
    }

    try {
      // Kitap verilerini göndermek için hazırla
      console.log("newBook", newBook);
      const bookData = {
        ...newBook,
        author: { id: newBook.authorId }, // Yazar ID'sini kitap verilerine ekle
        publisher: { id: newBook.publisherId }, // Yayınevi ID'sini kitap verilerine ekle
        categories: newBook.categoryIds.map((id) => ({ id })), // Kategorileri eşle
      };

      // Kitap eklemek için API'yi çağır
      await addBook(bookData);
      const booksResponse = await getBooks(); // Güncellenmiş kitap listesini getir
      setBooks(booksResponse); // State'i yeni kitap listesiyle güncelle

      toast.success("Yeni kitap başarıyla eklendi"); // Başarı bildirimi göster
      setNewBook({
        name: "",
        publicationYear: "",
        stock: "",
        authorId: "",
        publisherId: "",
        categoryIds: [],
      }); // Başarılı eklemeden sonra form alanlarını sıfırla
    } catch (error) {
      console.error("Kitap eklenirken hata:", error); // Ekleme sırasında oluşan hataları logla
      toast.error("Kitap eklenirken hata oluştu"); // Hata bildirimi göster
    }
  };

  // Bir kitabı düzenlemeyi işle
  const handleEdit = (book) => {
    setEditingBook(book); // Düzenlenecek kitabı ayarla
    setNewBook({
      name: book.name,
      publicationYear: book.publicationYear,
      stock: book.stock,
      authorId: book.author.id,
      publisherId: book.publisher.id,
      categoryIds: book.categories.map((category) => category.id),
    }); // Formu kitap verileriyle önceden doldur
  };

  // Bir kitabı güncellemeyi işle
  const handleUpdate = async (e) => {
    e.preventDefault(); // Formun sayfayı yeniden yüklemesini engelle

    if ( // Gerekli alanların doldurulup doldurulmadığını kontrol et
      !newBook.name ||
      !newBook.publicationYear ||
      !newBook.stock ||
      !newBook.authorId ||
      !newBook.publisherId ||
      !newBook.categoryIds.length
    ) {
      toast.warn("Lütfen tüm gerekli alanları doldurun."); // Eksik alanlar varsa uyarı bildirimi göster
      return;
    }

     // Formdaki verilerle güncellenmiş kitap nesnesini oluştur
    const updatedBookData = {
      ...editingBook, // Mevcut kitap verilerini koru
      name: newBook.name,
      publicationYear: newBook.publicationYear,
      stock: newBook.stock,
      author: { id: newBook.authorId }, // Yazar ID'sini güncelle
      publisher: { id: newBook.publisherId }, // Yayınevi ID'sini güncelle
      categories: newBook.categoryIds.map((id) => ({ id })), // Kategorileri güncelle
    };

    try {
      // Kitabı güncellemek için API'yi çağır
      const updatedBook = await updateBook(editingBook.id, updatedBookData);

      // State'teki kitaplar listesini yeni güncellenmiş kitapla güncelle
      setBooks(
        books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      ); 
      toast.success("Kitap başarıyla güncellendi"); // Başarı bildirimi göster
      setEditingBook(null); // Düzenleme durumunu sıfırla
      setNewBook({
        name: "",
        publicationYear: "",
        stock: "",
        authorId: "",
        publisherId: "",
        categoryIds: [],
      }); // Başarılı güncellemeden sonra form alanlarını sıfırla
    } catch (error) {
      console.error("Kitap güncellenirken hata:", error);
      toast.error("Kitap güncellenirken hata oluştu"); // Hata bildirimi göster
    }
  };
  // Bir kitabı silmeyi işle
  const handleDelete = async (id) => {
    try {
      await deleteBook(id); // Kitabı silmek için API'yi çağır
      setBooks(books.filter((book) => book.id !== id));  // Silinen kitabı state'ten kaldır
      toast.success("Kitap başarıyla silindi"); // Başarı bildirimi göster
    } catch (error) {
      console.error("Kitap silinirken hata:", error); // Silme sırasında oluşan hataları logla
      toast.error("Kitap silinirken hata oluştu"); // Hata bildirimi göster
    }
  };

  return (
    <div className="book-container">
      <h1 className="book-header">Kitap Listesi</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-row">
            <div>
              <strong>{book.name}</strong> ({book.publicationYear}) - Stok:{" "}
              {book.stock}
              <br />
              <strong>Yazar:</strong> {book.author?.name} <br />
              <strong>Yayınevi:</strong> {book.publisher?.name} <br />
              <strong>Kategoriler:</strong>{" "}
              {book.categories?.map((category) => category.name).join(", ")}{" "}
              <br />
            </div>
            <div className="button-group">
              <button
                className="update-button"
                onClick={() => handleEdit(book)}
                aria-label="Kitabı Güncelle"
              >
                <FaEdit size={20} /> {/* Düzenle simgesi */}
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(book.id)}
                aria-label="Kitabı Sil"
              >
                <FaTrash size={20} /> {/* Çöp kutusu simgesi */}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2>{editingBook ? "Kitabı Düzenle" : "Yeni Kitap Ekle"}</h2>
      <form onSubmit={editingBook ? handleUpdate : handleSubmit}>
        <div>
          <label>Kitap Adı:</label>
          <input
            className="form-input"
            type="text"
            value={newBook.name}
            onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Yayın Yılı:</label>
          <input
            className="form-input"
            type="number"
            value={newBook.publicationYear}
            onChange={(e) =>
              setNewBook({ ...newBook, publicationYear: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Stok:</label>
          <input
            className="form-input"
            type="number"
            value={newBook.stock}
            onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Yazar:</label>
          <select
            value={newBook.authorId}
            onChange={(e) =>
              setNewBook({ ...newBook, authorId: e.target.value })
            }
            required
          >
            <option value="">Yazar Seçin</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Yayınevi:</label>
          <select
            value={newBook.publisherId}
            onChange={(e) =>
              setNewBook({ ...newBook, publisherId: e.target.value })
            }
            required
          >
            <option value="">Yayınevi Seçin</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Kategoriler:</label>
          <select
            multiple
            value={newBook.categoryIds}
            onChange={(e) =>
              setNewBook({
                ...newBook,
                categoryIds: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              })
            }
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* İptal Butonu */}
        <button
          type="button"
          onClick={() => {
            setEditingBook(null); // Düzenleme modunu temizle
            setNewBook({
              name: "",
              publicationYear: "",
              stock: "",
              authorId: "",
              publisherId: "",
              categoryIds: [],
            }); // Formu temizle
          }}
          className="cancel-button"
        >
          İptal
        </button>

        <button className="add-form-button" type="submit">
          {editingBook ? "Kitabı Güncelle" : "Kitap Ekle"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;