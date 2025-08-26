# Real-Time Chat App 🚀

This is a **real-time chat application** built using **React (frontend)**, **Azure Functions (backend)**, and **Azure SignalR Service** for WebSocket-based messaging.  
Infrastructure was deployed with **Terraform**, backend developed in the **Azure Portal**, and frontend hosted with **Azure Static Web Apps (GitHub CI/CD)**.

---

## 🌟 Features
- 🔹 Real-time messaging using Azure SignalR
- 🔹 Serverless backend with Azure Functions
- 🔹 React + Vite frontend
- 🔹 Infrastructure-as-Code using Terraform
- 🔹 CI/CD via GitHub Actions

---

## 📸 Live Demo
👉 [Live App (temporary - will be removed after free trial)](https://thankful-dune-0a8de0d1e.2.azurestaticapps.net/)  
⚠️ *This demo will be live only for a limited time to save Azure free credits.*

---

## 🏗️ Architecture
Frontend (React + Vite) ---> Azure Static Web Apps
Backend (Azure Functions) ---> Azure SignalR Service
Infrastructure ---> Terraform (IaC)


---

## ⚡ Issues Faced & Fixes
1. ❌ **CORS issues** – Frontend couldn’t connect to Functions  
   ✅ Fixed by adding frontend domain in Azure Function CORS settings  

2. ❌ **SignalR error: Unexpected token `<`**  
   ✅ Root cause: Wrong endpoint. Fixed by setting `VITE_FUNCTION_APP_URL` correctly  

3. ❌ **404/405 on /api/negotiate & /broadcast**  
   ✅ Fixed by correcting function names & using proper Function URLs  

4. ❌ **.env not picked in production**  
   ✅ Solution: Added `VITE_FUNCTION_APP_URL` in **Static Web App Application Settings** (Portal)  

---

## ⚙️ Setup (Local Testing)
### 1️⃣ Clone the repo
```bash
git clone https://github.com/SahilShakya622/chat-app.git
cd chat-app

2️⃣ Install dependencies
cd frontend
npm install

3️⃣ Run locally
npm run dev

Make sure your Azure Functions are running & update .env:
VITE_FUNCTION_APP_URL=https://<your-function-app>.azurewebsites.net

🚀 Deployment

Frontend: Azure Static Web Apps (GitHub Actions CI/CD)
Backend: Azure Functions (Portal editor)
Infra: Terraform (provisioning resources like SignalR, Function App, etc.)

📂 Project Structure
chat-app/
│── frontend/       # React (Vite) frontend
│── backend/        # Azure Functions (Node.js)
│── terraform/      # Terraform IaC configs
│── README.md


📧 Contact

👤 Sahil Shakya
🔗 LinkedIn
