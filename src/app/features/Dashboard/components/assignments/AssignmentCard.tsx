import { useState } from "react";
import { AssignmentCardHandlers } from "./AssignmentCardHandlers";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@shared/ui/Button/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const AssignmentCard = ({
  name,
  dueDate,
}: {
  name: string;
  dueDate: string;
}) => {
  const [open, setOpen] = useState(false);

  const { handleCompletedAssignment, handleDeleteAssignment } =
    AssignmentCardHandlers({ name });

  return (
    <Card className="mt-5">
      <CardContent className="grid p-5 pt-1">
        <div className="flex items-center justify-between space-x-4  font-['Montserrat']">
          <div>
            <p className="text-xl leading-none">{name}</p>
            <p className="text-lg	 ">{dueDate}</p>
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button className="flex items-center">
                <ExpandMoreIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandList>
                  <CommandGroup className="p-1.5">
                    <CommandItem onSelect={handleCompletedAssignment}>
                      <p className="text-base">Mark As Completed</p>
                    </CommandItem>
                    <CommandItem onSelect={handleDeleteAssignment}>
                      <p className="text-base">Delete</p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};
