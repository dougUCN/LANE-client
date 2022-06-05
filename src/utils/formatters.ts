import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export const formatDate = (date: string) => {
  if (isNaN(Date.parse(date))) {
    return date;
  }

  // convertedDate is the local time of the machine; not UTC
  const convertedDate = parseISO(date);
  return formatInTimeZone(
    convertedDate,
    "America/Denver",
    "yyyy/MM/dd 'at' HH:mm:ss zzz",
  );
};

// Input: something_123_like_this_456
// Output: Something 123 Like This 456
export const formatName = (name?: string | null) => {
  if (!name) {
    return "";
  }
  return name
    .split("_")
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};
