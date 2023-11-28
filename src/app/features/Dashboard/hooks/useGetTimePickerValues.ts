type ValuePiece = Date | string | null;

export const useGetTimePickerValues = (timeFrame: string) => {

 const convertTo24HourFormat = (timeString: string) => {
    const [time, period] = timeString.split(" ");
    const [hour, minute] = time.split(":");
    let formattedHour = parseInt(hour);

    if (period === "PM") {
      formattedHour += 12;
    }

    return `${formattedHour}:${minute}`;
  }

  const checkTimePeriod = (): [ValuePiece, ValuePiece] => {
    const pmDate = timeFrame.includes("PM");
    const amDate = timeFrame.includes("AM");

    if (pmDate) {
      const [firstHour, endHour] = timeFrame.split("PM-");

      return [
        convertTo24HourFormat(`${firstHour}:00 PM`),
        convertTo24HourFormat(`${endHour.split("PM")[0]}:00 PM`),
      ];
    }

    if (amDate) {
      const [firstHour, endHour] = timeFrame.split("AM-");

      return [
        convertTo24HourFormat(`${firstHour}:00 AM`),
        convertTo24HourFormat(`${endHour.split("AM")[0]}:00 AM`),
      ];
    }

    return [null, null];
  }

  const pickerValues = checkTimePeriod()
  return pickerValues;
};
