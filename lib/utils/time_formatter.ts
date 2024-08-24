export function formatTime(epochTime: number): string {
  // Convert epoch time (which is in milliseconds) to seconds
  const totalSeconds = Math.floor(epochTime / 1000);

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(totalSeconds / 86400); // 86400 seconds in a day
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Format the time string based on conditions
  if (totalSeconds < 60) {
    return `${seconds}sec`;
  } else if (totalSeconds < 3600) {
    return `${minutes}min ${seconds}sec`;
  } else if (totalSeconds < 86400) {
    return `${hours}hrs ${minutes}min`;
  } else {
    return `${days}d ${hours}hrs ${minutes}min`;
  }
}

export const timeLeft = (deadline: number) => {
  const date = Date.now();

  const dateObject = new Date(deadline * 1000);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(dateObject.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const time_left = deadline - date;

  const timeLeftFormatted =
    time_left > 0 ? formatTime(time_left) : formattedDate;
  return timeLeftFormatted;
};
