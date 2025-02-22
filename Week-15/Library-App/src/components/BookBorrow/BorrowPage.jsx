import React, { useState, useEffect } from 'react';
import { getBorrowings, addBorrowing, updateBorrowing, deleteBorrowing } from '../../api/bookBorrowApi';
import { getBooks } from '../../api/bookApi';
import { toast } from 'react-toastify';
import './BorrowPage.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BookBorrowingPage = () => {
  const [borrowings, setBorrowings] = useState([]); // Ödünç almaların listesini saklamak için state
  const [books, setBooks] = useState([]); // Kitapların listesini saklamak için state
  const [selectedBook, setSelectedBook] = useState(null); // Ödünç almak için seçilen kitabı saklamak için state
  const [newBorrowing, setNewBorrowing] = useState({ // Yeni ödünç alma form verilerini saklamak için state
    borrowerName: '',
    borrowerMail: '',
    borrowingDate: '',
    returnDate: '', // İade tarihi alanı
  });
  const [editingBorrowing, setEditingBorrowing] = useState(null); // Mevcut bir ödünç almayı düzenlemek için state

   // Bileşen yüklendiğinde kitapları ve ödünç almaları getir
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBooks = await getBooks(); // Kitapları getir
        setBooks(fetchedBooks);
  
        const fetchedBorrowings = await getBorrowings(); // Ödünç almaları getir
        setBorrowings(fetchedBorrowings);
      } catch (error) {
        console.error("Veri getirilirken hata oluştu:", error);
        toast.error('Veri getirilemedi. Lütfen daha sonra tekrar deneyin.', { position: 'top-center' });
      }
    };
  
    fetchData(); // Boş bağımlılık dizisi, bu efekti bileşen yüklendiğinde bir kez çalıştırır
  }, []);

  // Dropdown'dan kitap seçimini işle
  const handleBookSelection = (bookId) => {
    const selected = books.find((book) => book.id === parseInt(bookId));
    setSelectedBook(selected); // Seçilen kitabı ayarla
  };

  // Yeni bir ödünç alma eklemeyi işle
  const handleAddBorrowing = async (e) => {
    e.preventDefault();

    // Doğrulama: Gerekli alanların doldurulup doldurulmadığını kontrol et
  if (!newBorrowing.borrowerName || !newBorrowing.borrowerMail || !newBorrowing.borrowingDate) {
    toast.error('Lütfen tüm gerekli alanları doldurun.', { position: 'top-center' });
    return;
  }

    if (!selectedBook) {
      toast.error('Lütfen bir kitap seçin.', { position: 'top-center' });
      return;
    }
  
    if (selectedBook.stock <= 0) {
      toast.error('Bu kitap stokta yok.', { position: 'top-center' });
      return;
    }
    // Ödünç alma eklemeyi ve stoku güncellemeyi dene
    try {
      const addedBorrowing = await addBorrowing({
        ...newBorrowing,
        bookForBorrowingRequest: {
          id: selectedBook.id,
          name: selectedBook.name,
          publicationYear: selectedBook.publicationYear,
          stock: selectedBook.stock - 1,
        },
      });
      
      // Kitaplar state'ini yeni stok değeri ile güncelle
      setBooks(
        books.map((book) =>
          book.id === selectedBook.id
            ? { ...book, stock: book.stock - 1 }
            : book
        )
      );
  
      setBorrowings([...borrowings, addedBorrowing]); // Yeni ödünç almayı listeye ekle
      setNewBorrowing({
        borrowerName: '',
        borrowerMail: '',
        borrowingDate: '',
      }); // Form alanlarını temizle
      setSelectedBook(null);
      toast.success('Ödünç alma başarıyla eklendi!', { position: 'top-center' });
    } catch (error) {
      console.error('Ödünç alma ekleme hatası:', error);
      toast.error('Ödünç alma eklenemedi. Lütfen tekrar deneyin.', { position: 'top-center' });
    }
  };

  // Bir ödünç almayı düzenlemeye başla
  const handleEditClick = (borrowing) => {
    setEditingBorrowing(borrowing); // Düzenlenecek ödünç almayı ayarla
  };
  // Mevcut bir ödünç almayı güncellemeyi işle
  const handleUpdateBorrowing = async (e) => {
    e.preventDefault();

    if (!editingBorrowing) return;

    const updatedRequest = {
      borrowerName: editingBorrowing.borrowerName,
      borrowingDate: editingBorrowing.borrowingDate,
      returnDate: editingBorrowing.returnDate,
    };

    try { // Ödünç almayı güncellemeyi dene
      const updatedBorrowing = await updateBorrowing(editingBorrowing.id, updatedRequest);
      setBorrowings((prev) =>
        prev.map((borrowing) =>
          borrowing.id === editingBorrowing.id ? updatedBorrowing : borrowing
        )
      );
      toast.success('Ödünç alma başarıyla güncellendi!', { position: 'top-center' });
      setEditingBorrowing(null); // Güncelleme sonrası formu sıfırla
    } catch (error) {
      console.error('Ödünç alma güncellenirken hata:', error);
      toast.error('Ödünç alma güncellenemedi. Lütfen tekrar deneyin.', { position: 'top-center' });
    }
  };

  // Bir ödünç almayı silmeyi işle
  const handleDeleteBorrowing = async (id) => {
    const confirmDelete = window.confirm(
      'Bu ödünç almayı silmek istediğinizden emin misiniz?'
    );
    if (!confirmDelete) return;

    try {
      await deleteBorrowing(id); // Ödünç almayı backend'den sil
      setBorrowings((prev) => prev.filter((borrowing) => borrowing.id !== id)); // State'ten kaldır
      toast.success('Ödünç alma başarıyla silindi!', {
        position: 'top-center',
      });
    } catch (error) {
      console.error('Ödünç alma silinirken hata:', error);
      toast.error('Ödünç alma silinemedi. Lütfen tekrar deneyin.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="book-container">
      <h1 className="book-header">Kitap Ödünç Alma</h1>
      {/* Ödünç almaların listesini göster */}
      <ul>
        {borrowings.map((borrowing) => (
          <li key={borrowing.id} className="book-row">
            <div>
            <strong>Ödünç Alan:</strong> {borrowing.borrowerName}<br />
            <strong>E-posta:</strong> {borrowing.borrowerMail}<br />
            <strong>Ödünç Alma Tarihi:</strong> {borrowing.borrowingDate}<br />
            <strong>İade Tarihi:</strong> {borrowing.returnDate || 'Henüz iade edilmedi'}<br />
            <strong>Kitap:</strong> {borrowing.book?.name}<br />
            </div>
            

            <div className='button-group'>
              {/* Düzenle butonu */}
            <button
                className="update-button"
                onClick={() => handleEditClick(borrowing)}
                aria-label="Ödünç Almayı Güncelle"
              >
                <FaEdit size={20} /> {/* Düzenle simgesi */}
              </button>
              {/* Sil butonu */}
              <button
                className="delete-button"
                onClick={() => handleDeleteBorrowing(borrowing.id)}
                aria-label="Kitabı Sil"
              >
                <FaTrash size={20} /> {/* Çöp kutusu simgesi */}
              </button>
            </div>            
          </li>
        ))}
      </ul>

        {/* Ödünç Alma Formu */}
      <form onSubmit={handleAddBorrowing} className="book-form">
        <input className="form-input"
          type="text"
          placeholder="Ödünç Alanın Adı"
          value={newBorrowing.borrowerName}
          onChange={(e) =>
            setNewBorrowing({ ...newBorrowing, borrowerName: e.target.value })
          }
        />
        <input className="form-input"
          type="email"
          placeholder="Ödünç Alanın E-posta Adresi"
          value={newBorrowing.borrowerMail}
          onChange={(e) =>
            setNewBorrowing({ ...newBorrowing, borrowerMail: e.target.value })
          }
        />
        <input className="form-input"
          type="date"
          placeholder="Ödünç Alma Tarihi"
          value={newBorrowing.borrowingDate}
          onChange={(e) =>
            setNewBorrowing({ ...newBorrowing, borrowingDate: e.target.value })
          }
        />     

        <select onChange={(e) => handleBookSelection(e.target.value)} className="form-input">
          <option value="">Bir Kitap Seçin</option>
          {books.map((book) => (
            <option key={book.id} value={book.id} disabled={book.stock === 0}>
              {book.name} (Stok: {book.stock})
            </option>
          ))}
        </select>

        <button className="add-form-button" type="submit">Ödünç Alma Ekle</button>
      </form>

      {/* Ödünç Almayı Güncelleme Formu */}
      {editingBorrowing && (
        <form onSubmit={handleUpdateBorrowing} className="update-form">
          <h2>Ödünç Almayı Güncelle</h2>
          <input className="form-input"
            type="text"
            value={editingBorrowing.borrowerName}
            onChange={(e) =>
              setEditingBorrowing({ ...editingBorrowing, borrowerName: e.target.value })
            }
          />
          <input className="form-input"
            type="date"
            value={editingBorrowing.borrowingDate}
            onChange={(e) =>
              setEditingBorrowing({ ...editingBorrowing, borrowingDate: e.target.value })
            }
          />
          <input className="form-input"
            type="date"
            value={editingBorrowing.returnDate || ''}
            onChange={(e) =>
              setEditingBorrowing({ ...editingBorrowing, returnDate: e.target.value })
            }
          />
          <button className="submit-button" type="submit">Değişiklikleri Kaydet</button>
        </form>
      )}
    </div>
  );
};

export default BookBorrowingPage;