// src/components/ScheduleTable.jsx

import { useState, useEffect } from 'react';
import { simulatedAnnealing } from '../algorithms/simulatedAnnealing';
import { checkConflicts } from '../utils/checkConflicts';
import StudentScheduleTable from './StudentScheduleTable';

const ScheduleTable = ({ initialSchedule }) => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedClass, setSelectedClass] = useState('A');

  useEffect(() => {
    const updatedSchedule = checkConflicts(schedule);
    setSchedule(updatedSchedule);
  }, []);

  const handleOptimizeSchedule = () => {
    const optimizedSchedule = simulatedAnnealing(schedule, 1000, 0.995);
    const updatedSchedule = checkConflicts(optimizedSchedule);
    setSchedule(updatedSchedule);
  };

  const handleOptimizeConflictedSchedule = () => {
    const conflictedSchedule = schedule.filter(entry => entry.conflict);
    const optimizedConflictedSchedule = simulatedAnnealing(conflictedSchedule, 1000, 0.995);
    const nonConflictedSchedule = schedule.filter(entry => !entry.conflict);
    const updatedSchedule = checkConflicts([...nonConflictedSchedule, ...optimizedConflictedSchedule]);
    setSchedule(updatedSchedule);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  return (
    <div className="schedule-table">
      <h3>Jadwal Pembelajaran</h3>
      <button onClick={handleOptimizeSchedule}>Optimalkan Seluruh Jadwal</button>
      <button onClick={handleOptimizeConflictedSchedule}>Optimalkan Jadwal Bentrok</button>
      <table>
        <thead>
          <tr>
            <th>Hari</th>
            <th>Jam Mulai</th>
            <th>Jam Selesai</th>
            <th>Mata Kuliah</th>
            <th>Dosen</th>
            <th>Ruang</th>
            <th>Kelas</th>
            <th>SKS</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((entry, index) => (
            <tr key={index} className={entry.conflict ? 'conflict' : ''}>
              <td>{entry.day}</td>
              <td>{entry.startTime}</td>
              <td>{entry.endTime}</td>
              <td>{entry.course}</td>
              <td>{entry.lecturer}</td>
              <td>{entry.room}</td>
              <td>{entry.class}</td>
              <td>{entry.sks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <label>Pilih Kelas: </label>
        <select onChange={handleClassChange}>
          <option value="A">Kelas A</option>
          <option value="B">Kelas B</option>
          <option value="C">Kelas C</option>
          {/* Tambahkan pilihan kelas lainnya */}
        </select>
      </div>
      <StudentScheduleTable schedule={schedule} selectedClass={selectedClass} />
    </div>
  );
};

export default ScheduleTable;
