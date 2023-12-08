type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const useConvertTimePickerValues = (timeValues: Value) => {
  const convertTo12HourFormat = (timeString: string) => {
    const [hour, minute] = timeString.split(":");
    const parsedHour = parseInt(hour, 10);
    const period = parsedHour >= 12 ? "PM" : "AM";
    const formattedHour = parsedHour % 12 || 12;

    return `${formattedHour}:${minute}${period}`;
  };

  const isValidTimeValue = (value: Value): value is string => {
    return typeof value === "string";
  };

  const formatValue = (value: Value): string => {
    if (isValidTimeValue(value)) {
      return convertTo12HourFormat(value);
    } else {
      return "";
    }
  };

  const formattedTimeValues =
    timeValues && (timeValues as Value[]).map(formatValue);

  const timeRange = formattedTimeValues && formattedTimeValues.join("-");

  if (timeRange !== null) {
    return timeRange;
  } else {
    return "";
  }
};
