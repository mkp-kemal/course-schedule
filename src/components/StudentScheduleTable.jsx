// src/components/StudentScheduleTable.jsx

import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { checkClassConflicts } from '../utils/checkConflicts';

const StudentScheduleTable = ({ schedule, selectedClass }) => {
  const [classSchedule, setClassSchedule] = useState([]);

  useEffect(() => {
    const updatedSchedule = checkClassConflicts(schedule, selectedClass);
    setClassSchedule(updatedSchedule.filter(entry => entry.class === selectedClass));
  }, [schedule, selectedClass]);

  const columns = [
    {
      title: 'Hari',
      dataIndex: 'day',
      key: 'day',
      filters: [
        { text: 'Senin', value: 'Senin' },
        { text: 'Selasa', value: 'Selasa' },
        { text: 'Rabu', value: 'Rabu' },
        { text: 'Kamis', value: 'Kamis' },
        { text: 'Jumat', value: 'Jumat' },
      ],
      onFilter: (value, record) => record.day.includes(value),
      sorter: (a, b) => a.days.indexOf(a.day) - a.days.indexOf(b.day),
    },
    {
      title: 'Jam Mulai',
      dataIndex: 'startTime',
      key: 'startTime',
      sorter: (a, b) => a.startTime.localeCompare(b.startTime),
    },
    {
      title: 'Jam Selesai',
      dataIndex: 'endTime',
      key: 'endTime',
      sorter: (a, b) => a.endTime.localeCompare(b.endTime),
    },
    {
      title: 'Mata Kuliah',
      dataIndex: 'course',
      key: 'course',
      sorter: (a, b) => a.course.localeCompare(b.course),
    },
    {
      title: 'Dosen',
      dataIndex: 'lecturer',
      key: 'lecturer',
      sorter: (a, b) => a.lecturer.localeCompare(b.lecturer),
    },
    {
      title: 'Ruang',
      dataIndex: 'room',
      key: 'room',
      filters: [
        { text: 'Ruang 101', value: 'Ruang 101' },
        { text: 'Ruang 102', value: 'Ruang 102' },
        { text: 'Ruang 103', value: 'Ruang 103' },
        { text: 'Ruang 104', value: 'Ruang 104' },
        { text: 'Ruang 105', value: 'Ruang 105' },
        { text: 'Ruang 106', value: 'Ruang 106' },
      ],
      onFilter: (value, record) => record.room.includes(value),
      sorter: (a, b) => a.room.localeCompare(b.room),
    },
    {
      title: 'SKS',
      dataIndex: 'sks',
      key: 'sks',
      sorter: (a, b) => a.sks - b.sks,
    },
  ];

  return (
    <div className="student-schedule-table">
      <h3>Jadwal Kelas {selectedClass}</h3>
      <Table
        columns={columns}
        dataSource={classSchedule.map((entry, index) => ({ ...entry, key: index }))}
        rowClassName={(record) => (record.conflict ? 'conflict' : '')}
      />
    </div>
  );
};

export default StudentScheduleTable;
