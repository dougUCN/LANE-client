import React from "react";

import { addDays, format } from "date-fns";

import DateField from "components/shared/DateField";

const pastMonth = new Date(2020, 10, 15);

const DateRangePicker = () => {
  const defaultSelected: { from: Date; to: Date } = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };

  const [range, setRange] = React.useState<
    { from: Date; to: Date } | undefined
  >(defaultSelected);

  if (!range?.from || !range?.to) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-row space-x-3">
        <DateField value={format(range.from, "PPP")} label="Start Date" />
        <DateField value={format(range.to, "PPP")} label="End Date" />
      </div>
    </div>
  );
};

export default DateRangePicker;
