export const formatTime = (durationSeconds: number) => {
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const seconds = Math.floor(durationSeconds % 60);
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return hours > 0
    ? `${hours}:${minutes}:${formattedSeconds}`
    : `${minutes}:${formattedSeconds}`;
};
