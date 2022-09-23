import TimeAgo, { FormatStyleName } from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

// Create formatter (English).
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

export const timeSince = (
  time: string | number | Date,
  style?: FormatStyleName | undefined
) => timeAgo.format(new Date(time), style);
