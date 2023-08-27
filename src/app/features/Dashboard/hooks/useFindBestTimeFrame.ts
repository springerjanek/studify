import { timeFramesData } from "../components/calendar/timeFramesData";

export const useFindBestTimeFrame = (date: string) => {
  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    if (time.length === 1) {
      return hours * 60;
    }

    return hours * 60 + minutes;
  };

  const findBestTimeFrame = (date: string) => {
    const [, timeRange] = date.split(": ");
    const [startStr, endStr] = timeRange.split("-");

    const startTime = convertTimeToMinutes(startStr.slice(0, -2));
    const endTime = convertTimeToMinutes(endStr.slice(0, -2));

    let bestFrame = null;
    let minDiff = Infinity;

    for (const frame of timeFramesData) {
      const [frameStartStr, frameEndStr] = frame.split("-");

      const frameStartTime = convertTimeToMinutes(frameStartStr.slice(0, -2));
      const frameEndTime = convertTimeToMinutes(frameEndStr.slice(0, -2));

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
