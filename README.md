# LEARNING MANAGEMENT SYSTEM

Proyek ini adalah Learning Management System (LMS) dengan tiga peran utama: Guru, Siswa, dan Admin.
Aplikasi dirancang dengan pemisahan yang bersih antara frontend dan backend, sehingga lebih mudah untuk dikembangkan, diuji, dan di-deploy secara terpisah maupun bersamaan.

- Frontend: Dibangun dengan Vue 3 + Vite untuk pengalaman pengguna yang cepat dan responsif.
- Backend: Dibangun dengan Express.js untuk menyediakan REST API yang sederhana, fleksibel, dan mudah diintegrasikan.

Tujuan utama proyek ini adalah memberikan arsitektur yang terstruktur, scalable, serta mudah dipahami oleh tim pengembang.
## Struktur Monorepo 

```
.
├── frontend  
└── backend    

```
## Tech Stack

**Frontend:** Vue 3, Pinia

**Backend:** Node, Express

**Dev Tools:** npm, Docker
## Getting Started

### 1. Prasayarat
Sebelum memulai, pastikan sudah terinstall:

- Node.js v18+
- npm / yarn / pnpm
- Git (untuk clone repo)
- (Opsional) Docker & Docker Compose

### 2. Clone Repository

```
git clone git@github.com:naufaladrian/azura-learning-management-system.git
```

### 3. Instalasi Dependensi

#### Frontend

```
cd frontend
npm install
cp .env.example .env
```

#### Backend

```
cd backend
npm install
cp .env.example .env
```

### 4. Menjalankan Aplikasi

#### Jalankan Frontend
```
cd frontend
npm run dev
```
Default berjalan di: http://localhost:5173

#### Jalankan Backend
```
cd backend
npm run dev
```
Default berjalan di: http://localhost:3000

### 5. Menghubungkan Frontend & Backend

Untuk menghubungkan keduanya, atur environment variable di `frontend/.env` :
```
VITE_API_URL=http://localhost:3000
```

### 6. Menjalankan dengan Docker

Jika ingin menjalankan seluruh stack dengan Docker:
```
docker-compose up --build
```

