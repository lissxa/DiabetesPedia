# DiabetesPedia 🌿🔬

## 🚀 Pendahuluan

**DiabetesPedia** adalah platform web inovatif yang didedikasikan untuk memberdayakan masyarakat Indonesia dalam upaya deteksi dini dan pencegahan diabetes. Dengan memanfaatkan teknologi Machine Learning, kami menyediakan prediksi status diabetes yang cepat, personalisasi saran kesehatan, serta akses ke artikel edukasi yang komprehensif.

Kami percaya bahwa akses mudah terhadap informasi dan deteksi dini adalah kunci untuk menekan lonjakan penderita diabetes di Indonesia, yang saat ini menduduki peringkat ke-5 di dunia dengan 19,5 juta kasus pada tahun 2021 (IDF 2021). DiabetesPedia hadir sebagai solusi proaktif dan preventif untuk permasalahan kesehatan krusial ini.

## ✨ Fitur Utama

- **Prediksi Status Diabetes:** Masukkan data kesehatan Anda dan dapatkan estimasi status diabetes Anda dengan cepat menggunakan model Machine Learning yang telah terlatih.
- **Saran Kesehatan Personalisasi:** Berdasarkan hasil prediksi, DiabetesPedia memberikan rekomendasi yang dipersonalisasi, seperti perubahan gaya hidup yang direkomendasikan.
- **Edukasi Komprehensif:** Jelajahi berbagai artikel informatif mengenai diabetes, cara menjaga kadar gula darah, nutrisi, olahraga, dan gaya hidup sehat lainnya.
- **Antarmuka Pengguna Intuitif:** Desain yang ramah pengguna memastikan pengalaman yang mudah dan menyenangkan bagi semua kalangan.

## 🌟 Mengapa DiabetesPedia Berbeda?

Kami mengidentifikasi celah pada platform serupa, terutama pada pengalaman input data pengguna. DiabetesPedia mengatasi hal ini dengan:

- **Inputan Pengguna yang Jelas:** Setiap kolom input dilengkapi dengan penjelasan dan panduan yang mudah dipahami, menghilangkan kebingungan bagi pengguna awam.
- **Saran yang Lebih Komprehensif:** Berbeda dengan platform lain yang mungkin hanya menyarankan kunjungan dokter, kami menyediakan rangkaian saran berdasarkan tingkat risiko diabetes.
- **Fokus pada Edukasi Preventif:** Selain prediksi, kami sangat menekankan pada edukasi dan pencegahan untuk membangun kesadaran jangka panjang.

## ⚙️ Teknologi yang Digunakan

DiabetesPedia dibangun dengan kombinasi teknologi modern untuk performa dan skalabilitas optimal:

**Frontend:**

- **Plain HTML, CSS, JavaScript**
- **Bootstrap**

**Backend:**

- **Javascript**
- **Node Js**
- **Hapi Js**

**Model Machine Learning:**

- **Dataset:** :

## 💻 Cara Menginstal dan Menjalankan (Lokal)

Ikuti langkah-langkah di bawah ini untuk menjalankan DiabetesPedia di lingkungan lokal Anda.

### Prasyarat

Pastikan Anda memiliki hal-hal berikut terinstal di sistem Anda:

- Visual Studio Code
- Node Js
- Python dengan pip
- `npm`
- `git`

### Langkah-langkah

1.  **Kloning Repositori:**

    ```bash
    git clone [https://github.com/lissxa/DiabetesPedia.git](https://github.com/lissxa/DiabetesPedia.git)
    cd DiabetesPedia
    ```

2.  **Menjalankan Backend (Hapi.js):**

    ```bash
    cd back-end   # Masuk ke folder backend
    npm install   # Instal dependensi backend
    npm run dev   # Jalankan server backend
    ```

    Server backend Hapi.js akan berjalan di `http://localhost:5000`.

3.  **Menjalankan Frontend:**

    ```bash
    cd front-end  # Masuk ke folder frontend
    npm install   # Instal dependensi frontend
    npm run dev   # Jalankan aplikasi frontend
    ```

    Aplikasi frontend akan terbuka di browser Anda, di `http://localhost:3001`.

4.  **Menjalankan Layanan Machine Learning:**
    ```bash
    cd ml-model                       # Masuk ke folder machine learning
    pip install -r requirements.txt   # Instal dependensi ML
    uvicorn app:app --reload          # Jalankan layanan ML
    ```
    Layanan Machine Learning FastApi akan berjalan di `http://localhost:8000`.

## 📧 Kontak

Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi tim pengembang:

- Lisa - LinkedIn: [https://www.linkedin.com/in/lisa-ang-516792234]
- Richelle Vania T. - LinkedIn: [https://www.linkedin.com/in/richellevaniathionanda]
- Claresta Ratna Cong - LinkedIn: [https://www.linkedin.com/in/clarestaratnacong]
- Maria Stephanie - LinkedIn: [https://www.linkedin.com/in/mariaawen]
- Valencia Sutio - LinkedIn: [https://www.linkedin.com/in/valenciasutio]
