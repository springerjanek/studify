import { useState } from "react";
import { useAuth } from "@/app/shared/utils/auth";
import { useGetTimePickerValues } from "../../../hooks/timePicker/useGetTimePickerValues";
import { useConvertTimePickerValues } from "../../../hooks/timePicker/useConvertTimePickerValues";
import { useGetUserSchedule } from "../../../data-access/getUserSchedule.query";
import { useUpdateAssignmentTime } from "../../../data-access/mutations/updateAssignmentTime.mutation";
import { Button } from "@/app/shared/ui/Button";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const TimePicker = ({
  timeFrame,
  assignmentName,
  assignmentDate,
  closeEdit,
}: {
  timeFrame: string;
  assignmentName: string;
  assignmentDate: string | undefined;
  closeEdit: () => void;
}) => {
  const defaultValues = useGetTimePickerValues(timeFrame);
  const [timePickerValues, setTimePickerValues] =
    useState<Value>(defaultValues);

  const { mutate: updateAssignmentTime } = useUpdateAssignmentTime();

  const convertedPickerValues = useConvertTimePickerValues(timePickerValues);

  const { currentUser } = useAuth();
  const { data: user_schedule } = useGetUserSchedule(currentUser.id);

  const onClickHandler = () => {
    const newTimeFrame = convertedPickerValues;

    updateAssignmentTime({
      newTimeFrame: newTimeFrame,
      assignmentDate: assignmentDate,
      assignmentName: assignmentName,
      user_schedule: user_schedule?.user_schedule,
      userId: currentUser.id,
    });
   
    closeEdit();
  };

  return (
    <>
      <TimeRangePicker
        format="h:mm a"
        minTime="08:00"
        maxTime="18:00"
        onChange={setTimePickerValues}
        value={timePickerValues}
      />
      <Button $primary onClick={onClickHandler}>
        Save
      </Button>
    </>
  );
};
