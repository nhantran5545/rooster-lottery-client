export const getNextAvailableSlot = () => {
  const currentDate = new Date();
  currentDate.setMinutes(0, 0, 0);
  currentDate.setHours(currentDate.getHours() + 1);
  return currentDate;
};

export const getNearbySlots = (availableSlot) => {
  const nearbySlots = [];
  const currentHour = availableSlot.getHours();

  for (let i = currentHour - 2; i <= currentHour + 2; i++) {
    nearbySlots.push({
      time: i,
      available: i === currentHour,
    });
  }

  return nearbySlots.filter((slot) => slot.time >= 0 && slot.time < 24);
};

export const formatSlotTime = (hour) => {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
