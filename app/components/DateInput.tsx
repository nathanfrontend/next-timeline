import React from "react";
import { TimelineType } from "../../types";
interface Props {
  items: TimelineType[];
  item: TimelineType;
  index: number;
  handleTextChange: Function;
}
const DateInput: React.FC<Props> = ({
  items,
  item,
  index,
  handleTextChange,
}) => {
  return (
    <div className="px-5 sm:mb-5  relative ">
      <input
        type="date"
        name="date"
        min={items[index - 1]?.date}
        className="mt-3 w-full sm:pr-8 hover:cursor-text hover:bg-red-300 resize-none rounded-lg border p-1 border-blue-100"
        value={item.date}
        onChange={(event) => handleTextChange(event, item.id)}
      />
    </div>
  );
};

export default DateInput;
