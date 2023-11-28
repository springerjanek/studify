import { useState } from "react";
import { useGetTimePickerValues } from "../../../hooks/useGetTimePickerValues";
import { Button } from "@/app/shared/ui/Button";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const TimePicker = ({
  timeFrame,
  closeEdit,
}: {
  timeFrame: string;
  closeEdit: () => void;
}) => {
  const defaultValues = useGetTimePickerValues(timeFrame);
  const [value, onChange] = useState<Value>(defaultValues);

  return (
    <>
      <TimeRangePicker
        format="h:mm a"
        minTime="08:00"
        maxTime="18:00"
        onChange={onChange}
        value={value}
      />
      <Button $primary onClick={closeEdit}>
        Save
      </Button>
    </>
  );
};
