// src/components/StudentScheduleTable.jsx


const StudentScheduleTable = ({ schedule, selectedClass }) => {
    const classSchedule = schedule.filter(entry => entry.class === selectedClass);

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
                        <tr key={index}>
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
