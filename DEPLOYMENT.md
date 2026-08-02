# Panduan Deployment FamilyAI Hub 🚀

Aplikasi **FamilyAI Hub** dirancang dengan arsitektur full-stack yang dapat di-deploy dengan mudah menggunakan Docker, Google Cloud Run, maupun Firebase Hosting.

---

## 🐳 Option 1: Deploy Menggunakan Docker (Rekomendasi Utama)

### Build Docker Image

```bash
docker build -t family-ai-hub:latest .
```

### Jalankan Docker Container

```bash
docker run -d \
  -p 3000:3000 \
  -e GEMINI_API_KEY="your_gemini_api_key" \
  --name family-ai-hub \
  family-ai-hub:latest
```

---

## 🐙 Option 2: Deploy Menggunakan Docker Compose

Disediakan file `docker-compose.yml` untuk kemudahan pengoperasian:

```bash
# Jalankan container di background
docker-compose up -d --build

# Cek log aplikasi
docker-compose logs -f
```

---

## ☁️ Option 3: Deploy ke Google Cloud Run

```bash
# 1. Build & Push Image ke Google Artifact Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/family-ai-hub:latest

# 2. Deploy ke Cloud Run
gcloud run deploy family-ai-hub \
  --image gcr.io/YOUR_PROJECT_ID/family-ai-hub:latest \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

---

## 🔥 Option 4: Deploy ke Firebase (Rekomendasi Terbaik & Pilihan Utama)

Project ini telah berhasil di-provision dengan **Firebase Firestore Database** & **Firebase Authentication** ID: `gen-lang-client-0597752043`.

### 1. Inisialisasi Firebase CLI (Jika Belum)
```bash
npm install -g firebase-tools
firebase login
```

### 2. Deploy Firestore Rules & Indexes
```bash
firebase deploy --only firestore:rules,firestore:indexes
```

### 3. Deploy Frontend Web App ke Firebase Hosting
```bash
# Build produksi aplikasi Vite
npm run build

# Deploy ke Firebase Hosting
firebase deploy --only hosting
```

---

## 🟠 Option 5: Deploy ke Alibaba Cloud (ECS / ACR + SAE / ACK)

Sangat Bisa! **FamilyAI Hub** sudah siap dikontainerisasi dengan Docker sehingga sangat mudah di-deploy ke layanan Alibaba Cloud:

### A. Deploy di Alibaba Cloud ECS (Elastic Compute Service)
1. Sewa instance ECS (Ubuntu / Alibaba Cloud Linux) di region **Jakarta (ap-southeast-5)**.
2. Install Docker & Docker Compose pada ECS.
3. Clone repositori & jalankan `docker-compose`:
```bash
git clone https://github.com/your-org/family-ai-hub.git
cd family-ai-hub
echo "GEMINI_API_KEY=your_key_here" > .env
docker-compose up -d --build
```

### B. Deploy Serverless via Alibaba Cloud ACR & SAE (Serverless App Engine)
1. **Push Image ke Container Registry (ACR)**:
```bash
# Login ke Alibaba Cloud Container Registry
docker login --username=your_account registry.ap-southeast-5.aliyuncs.com

# Tag dan Push image
docker tag family-ai-hub:latest registry.ap-southeast-5.aliyuncs.com/your-namespace/family-ai-hub:v1.0.0
docker push registry.ap-southeast-5.aliyuncs.com/your-namespace/family-ai-hub:v1.0.0
```
2. **Deploy di SAE (Serverless App Engine)**:
- Buka konsol Alibaba Cloud > **Serverless App Engine (SAE)**.
- Buat Application baru, pilih Image dari ACR yang baru di-push.
- Atur Port Container ke `3000`.
- Masukkan Environment Variable `GEMINI_API_KEY`.
- SAE akan mengelola autoscaling dan traffic HTTPS secara otomatis.
