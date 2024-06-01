// src/components/AddScheduleForm.jsx

import { useState } from 'react';

const AddScheduleForm = ({ onAddSchedule }) => {
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [course, setCourse] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [room, setRoom] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [sks, setSks] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!day || !time || !course || !lecturer || !room || !classGroup || !sks) {
      alert('Silakan lengkapi semua bidang.');
      return;
    }
    const newSchedule = { day, time, course, lecturer, room, class: classGroup, sks: parseInt(sks) };
    onAddSchedule(newSchedule);
    setDay('');
    setTime('');
    setCourse('');
    setLecturer('');
    setRoom('');
    setClassGroup('');
    setSks('');
  };

  return (
    <div className="add-schedule-form">
      <h3>Tambah Jadwal Baru</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Hari</label>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Pilih hari</option>
            <option value="Senin">Senin</option>
            <option value="Selasa">Selasa</option>
            <option value="Rabu">Rabu</option>
            <option value="Kamis">Kamis</option>
            <option value="Jumat">Jumat</option>
          </select>
        </div>
        <div className="form-control">
          <label>Jam</label>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Pilih jam</option>
            <option value="08:00 - 09:30">08:00 - 09:30</option>
            <option value="10:00 - 11:30">10:00 - 11:30</option>
            <option value="13:00 - 14:30">13:00 - 14:30</option>
            <option value="15:00 - 16:30">15:00 - 16:30</option>
          </select>
        </div>
        <div className="form-control">
          <label>Mata Kuliah</label>
          <input
            type="text"
            placeholder="Masukkan mata kuliah"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Dosen</label>
          <input
            type="text"
            placeholder="Masukkan nama dosen"
            value={lecturer}
            onChange={(e) => setLecturer(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Ruang</label>
          <input
            type="text"
            placeholder="Masukkan ruang"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Kelas</label>
          <input
            type="text"
            placeholder="Masukkan kelas"
            value={classGroup}
            onChange={(e) => setClassGroup(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Jumlah SKS</label>
          <select value={sks} onChange={(e) => setSks(e.target.value)}>
            <option value="">Pilih SKS</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button type="submit">Tambah Jadwal</button>
      </form>
    </div>
  );
};

export default AddScheduleForm;
