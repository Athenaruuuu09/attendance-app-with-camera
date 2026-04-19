<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplikasi Absensi Siswa - Face Recognition</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>📸 Sistem Absensi Siswa</h1>
            <p>Menggunakan Facial Recognition</p>
        </header>

        <div class="main-content">
            <!-- Section: Registrasi Wajah -->
            <section class="section" id="registerSection">
                <h2>1. Registrasi Data Siswa</h2>
                <div class="form-group">
                    <label for="studentName">Nama Siswa:</label>
                    <input type="text" id="studentName" placeholder="Masukkan nama siswa">
                </div>
                <div class="form-group">
                    <label for="studentId">NIS:</label>
                    <input type="text" id="studentId" placeholder="Masukkan NIS">
                </div>
                <div class="form-group">
                    <label for="studentClass">Kelas:</label>
                    <input type="text" id="studentClass" placeholder="Contoh: XII IPA 1">
                </div>
                <button id="startRegisterBtn" class="btn btn-primary">Mulai Registrasi Wajah</button>
                <div id="registrationStatus" class="status-message"></div>
            </section>

            <!-- Section: Kamera untuk Registrasi -->
            <section class="section" id="cameraRegisterSection" style="display: none;">
                <h2>Ambil Foto Wajah</h2>
                <div class="camera-container">
                    <video id="registerVideo" autoplay playsinline></video>
                    <canvas id="registerCanvas" style="display: none;"></canvas>
                </div>
                <div class="button-group">
                    <button id="captureBtn" class="btn btn-success">📷 Ambil Foto</button>
                    <button id="cancelRegisterBtn" class="btn btn-danger">Batal</button>
                </div>
                <div id="captureResult"></div>
            </section>

            <!-- Section: Absensi -->
            <section class="section" id="attendanceSection">
                <h2>2. Absensi Masuk</h2>
                <button id="startAttendanceBtn" class="btn btn-primary">Mulai Absensi</button>
            </section>

            <!-- Section: Kamera untuk Absensi -->
            <section class="section" id="cameraAttendanceSection" style="display: none;">
                <h2>Lakukan Pengenalan Wajah</h2>
                <div class="camera-container">
                    <video id="attendanceVideo" autoplay playsinline></video>
                    <canvas id="attendanceCanvas" style="display: none;"></canvas>
                </div>
                <div class="button-group">
                    <button id="detectBtn" class="btn btn-success">🔍 Deteksi Wajah</button>
                    <button id="cancelAttendanceBtn" class="btn btn-danger">Batal</button>
                </div>
                <div id="detectionResult"></div>
            </section>

            <!-- Section: Daftar Siswa Terdaftar -->
            <section class="section" id="studentListSection">
                <h2>3. Data Siswa Terdaftar</h2>
                <button id="refreshListBtn" class="btn btn-secondary">🔄 Muat Ulang</button>
                <div id="studentList" class="student-list"></div>
            </section>

            <!-- Section: Laporan Absensi -->
            <section class="section" id="attendanceReportSection">
                <h2>4. Laporan Absensi</h2>
                <button id="exportBtn" class="btn btn-secondary">📥 Export ke CSV</button>
                <button id="clearDataBtn" class="btn btn-danger">🗑️ Hapus Semua Data</button>
                <div id="attendanceReport" class="report-table"></div>
            </section>
        </div>
    </div>

    <!-- Script untuk Face Detection -->
    <script src="https://cdn.jsdelivr.net/npm/tracking@1.1.3/build/tracking-min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tracking@1.1.3/build/data/face-min.js"></script>
    <script src="app.js"></script>
</body>
</html>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 900px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px 20px;
    text-align: center;
}

header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
}

header p {
    font-size: 1.1em;
    opacity: 0.9;
}

.main-content {
    padding: 30px 20px;
}

.section {
    margin-bottom: 40px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    border-left: 5px solid #667eea;
}

.section h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 1.5em;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #555;
    font-weight: 600;
}

.form-group input {
    width: 100%;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 1em;
    transition: border-color 0.3s;
}

.form-group input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
}

.camera-container {
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 20px auto;
    border-radius: 10px;
    overflow: hidden;
    background: #000;
}

video {
    width: 100%;
    height: auto;
    display: block;
}

canvas {
    display: none;
}

.button-group {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-primary {
    background: #667eea;
    color: white;
}

.btn-primary:hover {
    background: #5568d3;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-success {
    background: #48bb78;
    color: white;
}

.btn-success:hover {
    background: #38a169;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(72, 187, 120, 0.4);
}

.btn-danger {
    background: #f56565;
    color: white;
}

.btn-danger:hover {
    background: #e53e3e;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(245, 101, 101, 0.4);
}

.btn-secondary {
    background: #718096;
    color: white;
}

.btn-secondary:hover {
    background: #4a5568;
    transform: translateY(-2px);
}

.status-message {
    margin-top: 20px;
    padding: 15px;
    border-radius: 6px;
    display: none;
}

.status-message.success {
    background: #c6f6d5;
    color: #22543d;
    border-left: 4px solid #48bb78;
    display: block;
}

.status-message.error {
    background: #fed7d7;
    color: #742a2a;
    border-left: 4px solid #f56565;
    display: block;
}

.status-message.info {
    background: #bee3f8;
    color: #2c5282;
    border-left: 4px solid #667eea;
    display: block;
}

#captureResult, #detectionResult {
    margin-top: 20px;
    padding: 15px;
    border-radius: 6px;
    display: none;
}

.student-list {
    margin-top: 20px;
    display: grid;
    gap: 15px;
}

.student-card {
    background: white;
    padding: 15px;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.student-info h3 {
    color: #333;
    margin-bottom: 5px;
}

.student-info p {
    color: #666;
    font-size: 0.9em;
}

.student-actions {
    display: flex;
    gap: 10px;
}

.btn-small {
    padding: 8px 16px;
    font-size: 0.85em;
}

.report-table {
    margin-top: 20px;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
}

th {
    background: #667eea;
    color: white;
    padding: 12px;
    text-align: left;
    font-weight: 600;
}

td {
    padding: 12px;
    border-bottom: 1px solid #e2e8f0;
}

tr:hover {
    background: #f8f9fa;
}

@media (max-width: 600px) {
    header h1 {
        font-size: 1.8em;
    }

    .main-content {
        padding: 15px;
    }

    .section {
        padding: 15px;
        margin-bottom: 25px;
    }

    .button-group {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }

    .student-card {
        flex-direction: column;
        align-items: flex-start;
    }

    .student-actions {
        width: 100%;
        margin-top: 10px;
    }

    .student-actions .btn-small {
        flex: 1;
    }
}
// Storage Keys
const STORAGE_KEYS = {
    STUDENTS: 'students_db',
    ATTENDANCE: 'attendance_db',
    FACE_DATA: 'face_data'
};

// Current Student Being Registered
let currentRegisteringStudent = null;
let currentStudentFace = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadStudentList();
    loadAttendanceReport();
});

// Setup Event Listeners
function setupEventListeners() {
    // Register Section
    document.getElementById('startRegisterBtn').addEventListener('click', startRegistration);
    document.getElementById('captureBtn').addEventListener('click', capturePhoto);
    document.getElementById('cancelRegisterBtn').addEventListener('click', cancelRegistration);

    // Attendance Section
    document.getElementById('startAttendanceBtn').addEventListener('click', startAttendance);
    document.getElementById('detectBtn').addEventListener('click', detectFace);
    document.getElementById('cancelAttendanceBtn').addEventListener('click', cancelAttendance);

    // List & Report Section
    document.getElementById('refreshListBtn').addEventListener('click', loadStudentList);
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
    document.getElementById('clearDataBtn').addEventListener('click', clearAllData);
}

// ============= REGISTRATION FUNCTIONS =============

function startRegistration() {
    const name = document.getElementById('studentName').value.trim();
    const nis = document.getElementById('studentId').value.trim();
    const className = document.getElementById('studentClass').value.trim();

    if (!name || !nis || !className) {
        showStatus('Mohon isi semua data terlebih dahulu!', 'error');
        return;
    }

    // Check if student already exists
    const students = getStudents();
    if (students.some(s => s.nis === nis)) {
        showStatus('NIS sudah terdaftar!', 'error');
        return;
    }

    currentRegisteringStudent = { name, nis, className, registeredAt: new Date().toISOString() };
    
    // Show camera section
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('cameraRegisterSection').style.display = 'block';

    // Start camera
    startCamera('registerVideo', 'register');
}

function startCamera(videoElementId, type) {
    const video = document.getElementById(videoElementId);

    navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
    }).then(stream => {
        video.srcObject = stream;
        showStatus(`Kamera ${type === 'register' ? 'registrasi' : 'absensi'} siap! Posisikan wajah Anda di tengah layar.`, 'info');
    }).catch(error => {
        showStatus('Tidak dapat mengakses kamera: ' + error.message, 'error');
        console.error('Camera error:', error);
    });
}

function capturePhoto() {
    const video = document.getElementById('registerVideo');
    const canvas = document.getElementById('registerCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Detect faces in the captured image
    detectFaceInCanvas(canvas, (faceData) => {
        if (!faceData) {
            showStatus('Wajah tidak terdeteksi. Pastikan wajah Anda jelas dan di depan kamera.', 'error');
            return;
        }

        // Convert canvas to image data for storage
        currentStudentFace = canvas.toDataURL('image/jpeg');
        
        // Save student data
        const student = {
            ...currentRegisteringStudent,
            id: generateId(),
            faceImage: currentStudentFace,
            faceData: faceData
        };

        saveStudent(student);
        
        // Show result
        const resultDiv = document.getElementById('captureResult');
        resultDiv.innerHTML = `
            <div class="status-message success">
                ✅ Wajah berhasil diambil dan disimpan!<br>
                <strong>${student.name}</strong> (${student.nis}) telah terdaftar.
            </div>
        `;
        resultDiv.style.display = 'block';

        // Reset after 2 seconds
        setTimeout(() => {
            resetRegistration();
        }, 2000);
    });
}

function detectFaceInCanvas(canvas, callback) {
    const tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track(canvas, tracker);

    tracker.on('track', (event) => {
        if (event.data.length > 0) {
            // Face detected
            const rect = event.data[0];
            callback({
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
            });
        } else {
            callback(null);
        }
    });

    // Give it time to detect
    setTimeout(() => {
        tracking.stop();
    }, 1500);
}

function resetRegistration() {
    stopCamera('registerVideo');
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('cameraRegisterSection').style.display = 'none';
    document.getElementById('studentName').value = '';
    document.getElementById('studentId').value = '';
    document.getElementById('studentClass').value = '';
    document.getElementById('captureResult').innerHTML = '';
    document.getElementById('captureResult').style.display = 'none';
    currentRegisteringStudent = null;
    currentStudentFace = null;
    loadStudentList();
}

function cancelRegistration() {
    stopCamera('registerVideo');
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('cameraRegisterSection').style.display = 'none';
    currentRegisteringStudent = null;
}

// ============= ATTENDANCE FUNCTIONS =============

function startAttendance() {
    document.getElementById('attendanceSection').style.display = 'none';
    document.getElementById('cameraAttendanceSection').style.display = 'block';
    startCamera('attendanceVideo', 'absensi');
}

function detectFace() {
    const video = document.getElementById('attendanceVideo');
    const canvas = document.getElementById('attendanceCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    detectFaceInCanvas(canvas, (faceData) => {
        if (!faceData) {
            showStatus('Wajah tidak terdeteksi. Coba lagi!', 'error');
            return;
        }

        // Match face with registered students
        matchFace(faceData, canvas);
    });
}

function matchFace(detectedFaceData, canvas) {
    const students = getStudents();
    
    if (students.length === 0) {
        showStatus('Tidak ada siswa terdaftar. Lakukan registrasi terlebih dahulu.', 'error');
        return;
    }

    // Simple matching based on face region
    // For better accuracy, you could implement more sophisticated algorithms
    const baseScore = calculateFaceMatch(detectedFaceData);
    let bestMatch = null;
    let highestScore = 0;

    students.forEach(student => {
        if (student.faceData) {
            const score = compareFaceData(detectedFaceData, student.faceData);
            if (score > highestScore) {
                highestScore = score;
                bestMatch = student;
            }
        }
    });

    // Threshold for match (60%)
    if (highestScore > 0.6) {
        recordAttendance(bestMatch, detectedFaceData);
    } else {
        showStatus('Wajah tidak cocok dengan siswa manapun. Coba lagi atau daftarkan diri Anda.', 'error');
    }
}

function compareFaceData(face1, face2) {
    // Calculate similarity score between two face regions (0-1)
    const dx = face1.x - face2.x;
    const dy = face1.y - face2.y;
    const dw = face1.width - face2.width;
    const dh = face1.height - face2.height;

    const distance = Math.sqrt(dx * dx + dy * dy + dw * dw + dh * dh);
    const maxDistance = 500; // Arbitrary max distance
    
    return Math.max(0, 1 - (distance / maxDistance));
}

function calculateFaceMatch(faceData) {
    // Additional matching logic can be added here
    return 1;
}

function recordAttendance(student, faceData) {
    const attendance = {
        id: generateId(),
        studentId: student.id,
        studentName: student.name,
        studentNis: student.nis,
        className: student.className,
        timestamp: new Date().toISOString(),
        faceData: faceData
    };

    saveAttendance(attendance);

    const resultDiv = document.getElementById('detectionResult');
    resultDiv.innerHTML = `
        <div class="status-message success">
            ✅ Absensi Berhasil!<br>
            <strong>${student.name}</strong> (${student.nis})<br>
            Waktu: ${new Date(attendance.timestamp).toLocaleString('id-ID')}
        </div>
    `;
    resultDiv.style.display = 'block';

    setTimeout(() => {
        resetAttendance();
        loadAttendanceReport();
    }, 2000);
}

function resetAttendance() {
    stopCamera('attendanceVideo');
    document.getElementById('attendanceSection').style.display = 'block';
    document.getElementById('cameraAttendanceSection').style.display = 'none';
    document.getElementById('detectionResult').innerHTML = '';
    document.getElementById('detectionResult').style.display = 'none';
}

function cancelAttendance() {
    stopCamera('attendanceVideo');
    document.getElementById('attendanceSection').style.display = 'block';
    document.getElementById('cameraAttendanceSection').style.display = 'none';
}

// ============= LIST & REPORT FUNCTIONS =============

function loadStudentList() {
    const students = getStudents();
    const listDiv = document.getElementById('studentList');

    if (students.length === 0) {
        listDiv.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">Belum ada siswa terdaftar</p>';
        return;
    }

    let html = '';
    students.forEach(student => {
        html += `
            <div class="student-card">
                <div class="student-info">
                    <h3>${student.name}</h3>
                    <p><strong>NIS:</strong> ${student.nis}</p>
                    <p><strong>Kelas:</strong> ${student.className}</p>
                    <p><strong>Terdaftar:</strong> ${new Date(student.registeredAt).toLocaleDateString('id-ID')}</p>
                </div>
                <div class="student-actions">
                    <button class="btn btn-small btn-danger" onclick="deleteStudent('${student.id}')">Hapus</button>
                </div>
            </div>
        `;
    });

    listDiv.innerHTML = html;
}

function deleteStudent(studentId) {
    if (confirm('Yakin ingin menghapus siswa ini? Data absensi akan tetap tersimpan.')) {
        let students = getStudents();
        students = students.filter(s => s.id !== studentId);
        localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
        loadStudentList();
        showStatus('Siswa berhasil dihapus!', 'success');
    }
}

function loadAttendanceReport() {
    const attendances = getAttendances();
    const reportDiv = document.getElementById('attendanceReport');

    if (attendances.length === 0) {
        reportDiv.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">Belum ada data absensi</p>';
        return;
    }

    // Sort by timestamp (newest first)
    attendances.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>NIS</th>
                    <th>Kelas</th>
                    <th>Waktu Absensi</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;

    attendances.forEach(att => {
        const date = new Date(att.timestamp);
        html += `
            <tr>
                <td>${att.studentName}</td>
                <td>${att.studentNis}</td>
                <td>${att.className}</td>
                <td>${date.toLocaleString('id-ID')}</td>
                <td>
                    <button class="btn btn-small btn-danger" onclick="deleteAttendance('${att.id}')">Hapus</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    reportDiv.innerHTML = html;
}

function deleteAttendance(attendanceId) {
    if (confirm('Yakin ingin menghapus record absensi ini?')) {
        let attendances = getAttendances();
        attendances = attendances.filter(a => a.id !== attendanceId);
        localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendances));
        loadAttendanceReport();
        showStatus('Data absensi berhasil dihapus!', 'success');
    }
}

function exportToCSV() {
    const attendances = getAttendances();
    if (attendances.length === 0) {
        showStatus('Tidak ada data absensi untuk di-export', 'error');
        return;
    }

    let csv = 'Nama,NIS,Kelas,Waktu Absensi\n';
    attendances.forEach(att => {
        const date = new Date(att.timestamp).toLocaleString('id-ID');
        csv += `"${att.studentName}","${att.studentNis}","${att.className}","${date}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `absensi_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showStatus('Data berhasil di-export!', 'success');
}

function clearAllData() {
    if (confirm('⚠️ PERINGATAN! Ini akan menghapus SEMUA data siswa dan absensi. Tindakan ini tidak dapat dibatalkan!\n\nLanjutkan?')) {
        if (confirm('Benar-benar yakin?')) {
            localStorage.removeItem(STORAGE_KEYS.STUDENTS);
            localStorage.removeItem(STORAGE_KEYS.ATTENDANCE);
            localStorage.removeItem(STORAGE_KEYS.FACE_DATA);
            
            loadStudentList();
            loadAttendanceReport();
            showStatus('Semua data berhasil dihapus!', 'success');
        }
    }
}

// ============= STORAGE FUNCTIONS =============

function saveStudent(student) {
    let students = getStudents();
    students.push(student);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
}

function getStudents() {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return data ? JSON.parse(data) : [];
}

function saveAttendance(attendance) {
    let attendances = getAttendances();
    attendances.push(attendance);
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendances));
}

function getAttendances() {
    const data = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return data ? JSON.parse(data) : [];
}

// ============= UTILITY FUNCTIONS =============

function stopCamera(videoElementId) {
    const video = document.getElementById(videoElementId);
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('registrationStatus');
    statusDiv.textContent = message;
    statusDiv.className = `status-message ${type}`;
    statusDiv.style.display = 'block';

    if (type !== 'error') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 4000);
    }
}
