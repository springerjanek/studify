import { timeFramesData } from "../components/calendar/timeFramesData";

export const useFindBestTimeFrame = (date: string) => {
  const convertTimeToMinutes = (time: string) => {
    const isPM = time.includes("PM");
    const [hours, minutes] = isPM
      ? time.split("PM")[0].split(":").map(Number)
      : time.split("AM")[0].split(":").map(Number);

    let totalMinutes = hours * 60 + (minutes || 0);

    if (isPM && hours !== 12) {
      totalMinutes += 12 * 60;
    }

    if (time.length === 1 && !isPM) {
      return hours * 60;
    }

    return totalMinutes;
  };

  const findBestTimeFrame = (date: string) => {
    const [, timeRange] = date.split(": ");
    const [startStr, endStr] = timeRange.split("-");

    const startTime = convertTimeToMinutes(startStr);
    const endTime = convertTimeToMinutes(endStr);

    let bestFrame = null;
    let minDiff = Infinity;

    for (const frame of timeFramesData) {
      const [frameStartStr, frameEndStr] = frame.split("-");

      const frameStartTime = convertTimeToMinutes(frameStartStr);
      const frameEndTime = convertTimeToMinutes(frameEndStr);

      const diffStart = Math.abs(startTime - frameStartTime);
      const diffEnd = Math.abs(endTime - frameEndTime);

      if (diffStart + diffEnd < minDiff) {
        minDiff = diffStart + diffEnd;
        bestFrame = frame;
      }
    }

    return bestFrame;
  };

  const bestFrame = findBestTimeFrame(date);
  return bestFrame;
};
