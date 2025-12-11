Laptop Inventory – MERN Stack (React + Express + MySQL)

Website ini adalah aplikasi manajemen data laptop yang terdiri dari fitur login, daftar laptop, detail laptop, tambah/edit laptop, dan hapus laptop.
Project ini dibangun menggunakan React (frontend), Express.js (backend), dan MySQL (database).

🚀 Fitur Utama
🔐 Authentication

Login menggunakan username & password dari database.

Token JWT disimpan di localStorage.

Protected Route → halaman hanya dapat diakses setelah login.

💻 Manajemen Laptop

CRUD Laptop (Create, Read, Update, Delete)

Input: brand, category, model, harga, tahun rilis, deskripsi.

Tampilan detail laptop.

UI modern bertema futuristic/space.

🏷️ Manajemen Brand & Category

Brand: ASUS, Acer, Lenovo, dll.

Category: Gaming, Ultrabook, Office, dsb.

🛠️ Tech Stack
Frontend

React + Vite

React Router

Axios

Tailwind/inline CSS (tema futuristic)

Backend

Node.js + Express

JWT Authentication

MySQL2

Modular Controllers & Routes

Database

MySQL / MariaDB

📂 Struktur Folder Singkat
/backend
├── controllers
├── routes
├── db.js
├── server.js

/frontend
├── src
│ ├── pages
│ ├── components
│ ├── api
│ ├── App.jsx
└── index.html

⚙️ Cara Menjalankan Project
1️⃣ Clone Repository
git clone https://github.com/username/laptop-inventory.git
cd laptop-inventory

🗄️ Setup Backend
2️⃣ Install Dependencies
cd backend
npm install

3️⃣ Setup Database

Import file SQL atau buat tabel minimal:

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50),
password VARCHAR(255)
);

CREATE TABLE brands (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100)
);

CREATE TABLE categories (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100)
);

CREATE TABLE laptops (
id INT AUTO_INCREMENT PRIMARY KEY,
brand_id INT,
category_id INT,
model VARCHAR(100),
price INT,
release_year INT,
description TEXT,
FOREIGN KEY (brand_id) REFERENCES brands(id),
FOREIGN KEY (category_id) REFERENCES categories(id)
);

4️⃣ Jalankan Backend
npm run dev

Server berjalan di:

http://localhost:3000

🖥️ Setup Frontend
5️⃣ Install Dependencies
cd ../frontend
npm install

6️⃣ Jalankan Frontend
npm run dev

Akses di:

http://localhost:5173

🔑 Login Default

Setelah membuat user di database:

username: admin
password: 123456

📌 Catatan

Pastikan backend berjalan agar halaman daftar laptop tidak error.

Pastikan file .env atau konfigurasi database benar.

Token akan hilang saat logout karena localStorage dibersihkan.

🛸 Status Project

✔️ CRUD Laptop
✔️ CRUD Brand
✔️ CRUD Category
✔️ Login page
✔️ Protected route
✔️ UI tema luar angkasa
