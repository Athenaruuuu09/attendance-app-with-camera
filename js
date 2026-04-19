const faceapi = require('face-api.js');
const canvas = require('canvas');
const fs = require('fs');
const path = require('path');

const MODEL_URL = '/models';

async function loadModels() {
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.ssdMobileNetv1.loadFromUri(MODEL_URL);
}

async function detectFacesAndTrackAttendance(imagePath) {
  const img = await canvas.loadImage(imagePath);
  const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();

  // Load existing attendance records
  const attendanceFile = 'attendance.json';
  let attendanceRecords = {};
  if (fs.existsSync(attendanceFile)) {
    attendanceRecords = JSON.parse(fs.readFileSync(attendanceFile));
  }

  detections.forEach(detection => {
    const faceId = detection.detection.box.x + '_' + detection.detection.box.y;
    const currentDateTime = new Date().toISOString();
    attendanceRecords[faceId] = currentDateTime;  // Track attendance
  });

  fs.writeFileSync(attendanceFile, JSON.stringify(attendanceRecords, null, 2));
  console.log('Attendance tracked:', attendanceRecords);
}

async function main() {
  await loadModels();
  const imagePath = 'path/to/image.jpg'; // Change this to your image path
  await detectFacesAndTrackAttendance(imagePath);
}

main();
