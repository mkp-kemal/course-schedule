// src/components/ScheduleTable.jsx

import { useState, useEffect } from 'react';
import { Button, Table, Select } from 'antd';
import { simulatedAnnealing } from '../algorithms/simulatedAnnealing';
import { checkConflicts } from '../utils/checkConflicts';
import StudentScheduleTable from './StudentScheduleTable';

const { Option } = Select;

const ScheduleTable = ({ initialSchedule }) => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedClass, setSelectedClass] = useState('A');

  useEffect(() => {
    const updatedSchedule = checkConflicts(schedule);
    setSchedule(updatedSchedule);
  }, [schedule]);

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

  const handleClassChange = (value) => {
    setSelectedClass(value);
  };

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
    },
    {
      title: 'Mata Kuliah',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Dosen',
      dataIndex: 'lecturer',
      key: 'lecturer',
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
    },
    {
      title: 'Kelas',
      dataIndex: 'class',
      key: 'class',
      filters: [
        { text: 'A', value: 'A' },
        { text: 'B', value: 'B' },
        { text: 'C', value: 'C' },
        // Tambahkan filter kelas lainnya
      ],
      onFilter: (value, record) => record.class.includes(value),
    },
    {
      title: 'SKS',
      dataIndex: 'sks',
      key: 'sks',
    },
  ];

  return (
    <div className="schedule-table">
      <h3>Jadwal Pembelajaran</h3>
      <div style={{ marginBottom: '16px' }}>
        <Button onClick={handleOptimizeSchedule} type="primary" style={{ marginRight: '8px' }}>Optimalkan Seluruh Jadwal</Button>
        <Button onClick={handleOptimizeConflictedSchedule} type="default" style={{ marginRight: '8px' }}>Optimalkan Jadwal Bentrok</Button>
      </div>

      <Table
        columns={columns}
        dataSource={schedule.map((entry, index) => ({ ...entry, key: index }))}
        rowClassName={(record) => (record.conflict ? 'conflict' : '')}
      />
      <Select defaultValue="A" style={{ width: 120 }} onChange={handleClassChange}>
        <Option value="A">Kelas A</Option>
        <Option value="B">Kelas B</Option>
        <Option value="C">Kelas C</Option>
        {/* Tambahkan pilihan kelas lainnya */}
      </Select>
      <StudentScheduleTable schedule={schedule} selectedClass={selectedClass} />
    </div>
  );
};

export default ScheduleTable;
