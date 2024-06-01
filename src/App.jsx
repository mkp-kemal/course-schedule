// src/App.jsx

import { useState } from 'react';
import ScheduleTable from './components/ScheduleTable';
import AddScheduleForm from './components/AddScheduleForm';
import './App.css'
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const initialSchedule = [
  { day: 'Senin', startTime: '08:00', sks: 2, course: 'Pemrograman Web', lecturer: 'Dr. Ahmadi', room: 'Ruang 103', class: 'A' },
  { day: 'Senin', startTime: '10:00', sks: 1, course: 'Basis Data', lecturer: 'Dr. Budi', room: 'Ruang 102', class: 'B' },
  { day: 'Senin', startTime: '08:00', sks: 2, course: 'Algoritma', lecturer: 'Dr. Dedi', room: 'Ruang 101', class: 'B' },
  { day: 'Selasa', startTime: '08:00', sks: 2, course: 'Sistem Operasi', lecturer: 'Dr. Eko', room: 'Ruang 104', class: 'C' },
  { day: 'Selasa', startTime: '10:00', sks: 1, course: 'Basis Data', lecturer: 'Dr. Budi', room: 'Ruang 102', class: 'A' },
  { day: 'Rabu', startTime: '08:00', sks: 2, course: 'Keamanan Siber', lecturer: 'Dr. Gina', room: 'Ruang 106', class: 'A' },
  { day: 'Rabu', startTime: '08:00', sks: 2, course: 'Pengolahan Citra', lecturer: 'Dr. Joko', room: 'Ruang 106', class: 'B' },
  { day: 'Kamis', startTime: '10:00', sks: 2, course: 'Pemrograman Web', lecturer: 'Dr. Ahmadi', room: 'Ruang 101', class: 'C' },
  { day: 'Jumat', startTime: '08:00', sks: 2, course: 'Rekayasa Perangkat Lunak', lecturer: 'Dr. Kurnia', room: 'Ruang 110', class: 'C' },
  { day: 'Jumat', startTime: '10:00', sks: 2, course: 'Manajemen Proyek', lecturer: 'Dr. Lila', room: 'Ruang 111', class: 'B' },
  { day: 'Jumat', startTime: '13:00', sks: 2, course: 'Pemrograman Web', lecturer: 'Dr. Ahmadi', room: 'Ruang 101', class: 'A' },
  { day: 'Rabu', startTime: '13:00', sks: 2, course: 'Pemrograman Web', lecturer: 'Dr. Ahmadi', room: 'Ruang 103', class: 'A' },
  { day: 'Rabu', startTime: '13:00', sks: 2, course: 'Praktikum Web', lecturer: 'Dr. Kemal', room: 'Ruang 103', class: 'C' },
];



const App = () => {
  const [schedule, setSchedule] = useState(initialSchedule);

  const handleAddSchedule = (newSchedule) => {
    setSchedule([...schedule, newSchedule]);
  };

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main>
          <ScheduleTable initialSchedule={schedule} />
          <AddScheduleForm onAddSchedule={handleAddSchedule} />
        </main>
      </div>
    </div>
  );
};

export default App;
