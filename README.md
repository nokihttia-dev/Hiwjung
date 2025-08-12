
```markdown
# Hiwjung - Recipe Sharing Platform

Hiwjung คือเว็บแอปพลิเคชันสำหรับแบ่งปันสูตรอาหาร ที่ช่วยให้ผู้ใช้สามารถค้นหา เพิ่ม และแบ่งปันสูตรอาหารหลากหลายประเภทได้อย่างง่ายดาย พร้อมฟีเจอร์ค้นหาและจัดหมวดหมู่สูตรอาหารที่ใช้งานสะดวก

---

## 🚀 ฟีเจอร์หลัก

- ค้นหาและเรียกดูสูตรอาหารตามหมวดหมู่
- เพิ่มสูตรอาหารใหม่ พร้อมอัปโหลดรูปภาพประกอบ
- ลงทะเบียนและเข้าสู่ระบบเพื่อจัดการสูตรอาหารของตนเอง
- ระบบแสดงสูตรอาหารแนะนำสำหรับผู้ใช้
- รองรับการใช้งานทั้งบน Desktop และ Mobile

---

## 🗂 โครงสร้างโปรเจกต์

```

Hiwjung/
├── frontend/      # React + Vite สำหรับหน้าเว็บผู้ใช้
└── backend/       # Node.js + Express + MongoDB สำหรับ API และฐานข้อมูล

````

---

## ⚙️ การติดตั้งและใช้งาน

### 1. Clone โปรเจกต์

```bash
git clone <repo-url>
cd Hiwjung
````

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์ `backend/` โดยใช้ตัวอย่างไฟล์ใน repo

```env
MONGO_URI=<your-mongodb-uri>
PORT=5000
```

### 3. รันด้วย Docker (แนะนำ)

```bash
docker-compose up --build
```

* Frontend: [http://localhost:80](http://localhost:80)
* Backend API: [http://localhost:5000](http://localhost:5000)

### 4. รันแบบ Local (ไม่ใช้ Docker)

#### Backend

```bash
cd backend
npm install
npm start
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🛠 เทคโนโลยีที่ใช้

* **Frontend:** React, Vite, CSS
* **Backend:** Node.js, Express.js, MongoDB
* **DevOps:** Docker, Docker Compose

---

## 📁 โฟลเดอร์สำคัญ

* `frontend/src/components/` — คอมโพเนนต์ UI
* `frontend/src/pages/` — หน้าแต่ละหน้าของเว็บ
* `backend/models/` — โมเดลฐานข้อมูล
* `backend/routes/` — เส้นทาง API


