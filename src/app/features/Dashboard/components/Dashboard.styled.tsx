import { styled } from "styled-components";
import { DateCalendar } from "@mui/x-date-pickers";

export const Container = styled.main`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  margin-left: 150px;
  margin-right: 150px;
`;

export const AssignmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 22%;
  button {
    width: 50%;
    align-self: center;
  }
`;

export const AssignmentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  background-color: white;
  color: black;
  border-radius: 10px;
  margin-bottom: 15px;
  p {
    padding: 10px 15px;
  }
`;

export const StyledDateCalendar = styled(DateCalendar)`
  height: 310px;
  background-color: white;
  color: black;
  border-radius: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;
