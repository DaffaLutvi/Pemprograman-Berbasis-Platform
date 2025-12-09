const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// --- DATABASE SEMENTARA (In-Memory) ---
let books = [
    { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', stock: 10 },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', stock: 5 }
];
let orders = [];

// --- 1. KELOLA BUKU (KATALOG) ---

// A. Menambahkan Buku
app.post('/books', (req, res) => {
    const { title, author, stock } = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author,
        stock: stock || 0
    };
    books.push(newBook);
    res.status(201).json({ message: 'Buku berhasil ditambahkan', data: newBook });
});

// B. Mencari Buku (Berdasarkan Judul)
app.get('/books', (req, res) => {
    const { search } = req.query;
    if (search) {
        const result = books.filter(book => 
            book.title.toLowerCase().includes(search.toLowerCase())
        );
        return res.json({ data: result });
    }
    res.json({ data: books });
});

// C. Memperbarui Stok Buku
app.patch('/books/:id/stock', (req, res) => {
    const { id } = req.params;
    const { stock } = req.body;
    
    const book = books.find(b => b.id === parseInt(id));
    if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });

    book.stock = stock;
    res.json({ message: 'Stok berhasil diperbarui', data: book });
});

// --- 2. KELOLA PESANAN (ORDER) ---

// A. Buat Pesanan (Status Default: Pending)
app.post('/orders', (req, res) => {
    const { bookId, quantity } = req.body;

    // Validasi: Jumlah harus > 0 (Sesuai Soal)
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Jumlah pesanan harus lebih dari 0' });
    }

    const book = books.find(b => b.id === bookId);
    if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });

    // Cek ketersediaan stok
    if (book.stock < quantity) {
        return res.status(400).json({ message: 'Stok buku tidak mencukupi' });
    }

    const newOrder = {
        id: orders.length + 1,
        bookId,
        quantity,
        status: 'pending' // Default status sesuai soal
    };
    
    orders.push(newOrder);
    res.status(201).json({ message: 'Pesanan dibuat, menunggu konfirmasi', data: newOrder });
});

// B. Endpoint Konfirmasi Pesanan
app.post('/orders/:id/confirm', (req, res) => {
    const { id } = req.params;
    const order = orders.find(o => o.id === parseInt(id));

    if (!order) return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    if (order.status !== 'pending') {
        return res.status(400).json({ message: `Pesanan sudah berstatus ${order.status}` });
    }

    // Kurangi stok buku saat konfirmasi
    const book = books.find(b => b.id === order.bookId);
    if (!book) {
        return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    
    if (book.stock >= order.quantity) {
        book.stock -= order.quantity; // Update stok
        order.status = 'confirmed';   // Ubah status
        res.json({ message: 'Pesanan berhasil dikonfirmasi', data: order, currentBookStock: book.stock });
    } else {
        order.status = 'cancelled';
        res.status(400).json({ message: 'Gagal konfirmasi: Stok habis saat proses berlangsung' });
    }
});

// C. Endpoint Melihat Semua Pesanan
app.get('/orders', (req, res) => {
    res.json({ data: orders });
});

// D. Endpoint Melihat Detail Pesanan
app.get('/orders/:id', (req, res) => {
    const { id } = req.params;
    const order = orders.find(o => o.id === parseInt(id));
    if (!order) return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    res.json({ data: order });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});