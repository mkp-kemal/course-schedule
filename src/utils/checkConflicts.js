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

export function checkConflicts(schedule) {
  const updatedSchedule = schedule.map((entry) => {
      const endTime = calculateEndTime(entry.startTime, entry.sks);
      return { ...entry, endTime };
  });

  const usedSlots = {};
  updatedSchedule.forEach((entry) => {
      const key = `${entry.day}-${entry.room}`;
      if (!usedSlots[key]) {
          usedSlots[key] = [];
      }
      usedSlots[key].push(entry);
  });

  const conflicts = new Set();
  for (const key in usedSlots) {
      const slots = usedSlots[key];
      slots.sort((a, b) => a.startTime.localeCompare(b.startTime));

      for (let i = 0; i < slots.length - 1; i++) {
          const currentSlot = slots[i];
          const nextSlot = slots[i + 1];
          if (currentSlot.endTime > nextSlot.startTime) {
              conflicts.add(currentSlot);
              conflicts.add(nextSlot);
          }
      }
  }

  return updatedSchedule.map((entry) => ({
      ...entry,
      conflict: conflicts.has(entry),
  }));
}

export function checkClassConflicts(schedule, selectedClass) {
  const updatedSchedule = [...schedule]; // Copying the schedule
  const classSchedule = updatedSchedule.filter(entry => entry.class === selectedClass);

  for (let i = 0; i < classSchedule.length; i++) {
      for (let j = i + 1; j < classSchedule.length; j++) {
          if (
              classSchedule[i].day === classSchedule[j].day &&
              (
                  (classSchedule[i].startTime < classSchedule[j].endTime && classSchedule[i].endTime > classSchedule[j].startTime) ||
                  (classSchedule[j].startTime < classSchedule[i].endTime && classSchedule[j].endTime > classSchedule[i].startTime)
              )
          ) {
              classSchedule[i].conflict = true;
              classSchedule[j].conflict = true;
          }
      }
  }

  return updatedSchedule;
}
