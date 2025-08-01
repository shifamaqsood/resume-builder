# 🧾 Modular Resume Builder (MERN)

A full-stack resume builder built using the **MERN stack** with the following features:

- 🧩 Modular Form Sections (Education, Experience, Skills)
- 🔄 Drag-and-Drop Reordering (react-beautiful-dnd)
- 👀 Live Resume Preview
- 📄 Download as PDF (html2pdf.js)
- 💾 Save and Load Resume to/from MongoDB
- 🎨 Custom UI with Flexbox/Grid, animations, and responsive design

---

## 🔧 Tech Stack

| Layer        | Tech                     |
|--------------|--------------------------|
| Frontend     | React, CSS Grid/Flexbox  |
| Backend      | Node.js, Express         |
| Database     | MongoDB Atlas            |
| UI Libraries | react-beautiful-dnd, html2pdf.js, Axios |

---

## 📸 Screenshots

![Drag and Drop](./screenshots/drag-drop.png)
![PDF Preview](./screenshots/pdf-preview.png)

---

## 🚀 Features

- Modular form for entering sections
- Drag and drop to reorder sections (DnD)
- Live preview pane for instant feedback
- Download formatted resume as PDF
- Save/load resume data to MongoDB
- Smooth animations and mobile-friendly layout

---

## 🛠️ Setup Instructions

### 📁 Clone the repo

```bash
git clone https://github.com/shifamaqsood/resume-builder.git
cd resume-builder
```
 #Backend Setup
``` cd backend
npm install
touch .env
```
Add your MongoDB URI to .env:
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/resumes
PORT=5000
```
Then run:

```
npm start
 ```
🔜 Frontend Setup
```

cd ../frontend
npm install
Install extra libraries:


npm install react-beautiful-dnd html2pdf.js axios --legacy-peer-deps
Then start the app:


npm start
```
Frontend: http://localhost:3000
Backend: http://localhost:5000


