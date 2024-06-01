// src/algorithms/simulatedAnnealing.js

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
const timeSlots = [
    '08:00', '09:30', '11:00', '12:30',
    '14:00', '15:30', '17:00'
];
const rooms = [
    'Ruang 101', 'Ruang 102', 'Ruang 103',
    'Ruang 104', 'Ruang 105', 'Ruang 106'
];

function calculateEndTime(startTime, sks) {
    const [startHour, startMinutes] = startTime.split(':').map(Number);
    const duration = sks * 90; // 1 SKS = 1 jam 30 menit
    let endHour = startHour + Math.floor(duration / 60);
    let endMinutes = startMinutes + (duration % 60);

    if (endMinutes >= 60) {
        endHour += 1;
        endMinutes -= 60;
    }

    return `${endHour.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
}

function calculateConflict(schedule) {
    let conflictCount = 0;
    const usedSlots = {};

    schedule.forEach(entry => {
        const key = `${entry.day}-${entry.room}`;
        if (!usedSlots[key]) {
            usedSlots[key] = [];
        }
        usedSlots[key].push(entry);
    });

    for (const key in usedSlots) {
        const slots = usedSlots[key];
        slots.sort((a, b) => a.startTime.localeCompare(b.startTime));

        for (let i = 0; i < slots.length - 1; i++) {
            const currentSlot = slots[i];
            const nextSlot = slots[i + 1];
            const currentEndTime = calculateEndTime(currentSlot.startTime, currentSlot.sks);
            if (currentEndTime > nextSlot.startTime) {
                conflictCount++;
            }
        }
    }

    return conflictCount;
}

export function simulatedAnnealing(schedule, maxIterations, coolingRate) {
    let currentSchedule = [...schedule];
    let bestSchedule = [...schedule];
    let currentConflict = calculateConflict(currentSchedule);
    let bestConflict = currentConflict;

    let temperature = 1.0;

    for (let i = 0; i < maxIterations; i++) {
        const newSchedule = [...currentSchedule];

        const randomIndex = Math.floor(Math.random() * newSchedule.length);
        newSchedule[randomIndex] = {
            ...newSchedule[randomIndex],
            day: days[Math.floor(Math.random() * days.length)],
            startTime: timeSlots[Math.floor(Math.random() * timeSlots.length)],
            room: rooms[Math.floor(Math.random() * rooms.length)]
        };

        const newConflict = calculateConflict(newSchedule);

        if (newConflict < bestConflict || Math.exp((currentConflict - newConflict) / temperature) > Math.random()) {
            currentSchedule = newSchedule;
            currentConflict = newConflict;
            if (currentConflict < bestConflict) {
                bestSchedule = currentSchedule;
                bestConflict = currentConflict;
            }
        }

        temperature *= coolingRate;
    }

    return bestSchedule;
}
