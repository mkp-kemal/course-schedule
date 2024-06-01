// src/components/StudentScheduleTable.jsx

import { useEffect, useState } from 'react';
import { checkClassConflicts } from '../utils/checkConflicts';

const StudentScheduleTable = ({ schedule, selectedClass }) => {
  const [classSchedule, setClassSchedule] = useState([]);

  useEffect(() => {
    const updatedSchedule = checkClassConflicts(schedule, selectedClass);
    setClassSchedule(updatedSchedule.filter(entry => entry.class === selectedClass));
  }, [schedule, selectedClass]);

  return (
    <div className="student-schedule-table">
      <h3>Jadwal Kelas {selectedClass}</h3>
      <table>
        <thead>
          <tr>
            <th>Hari</th>
            <th>Jam Mulai</th>
            <th>Jam Selesai</th>
            <th>Mata Kuliah</th>
            <th>Dosen</th>
            <th>Ruang</th>
            <th>SKS</th>
          </tr>
        </thead>
        <tbody>
          {classSchedule.map((entry, index) => (
            <tr key={index} className={entry.conflict ? 'conflict' : ''}>
              <td>{entry.day}</td>
              <td>{entry.startTime}</td>
              <td>{entry.endTime}</td>
              <td>{entry.course}</td>
              <td>{entry.lecturer}</td>
              <td>{entry.room}</td>
              <td>{entry.sks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentScheduleTable;
