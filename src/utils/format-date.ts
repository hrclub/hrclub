import { formatRelative } from "date-fns";

export function formatDate(date: Date | string) {
  return formatRelative(new Date(date), new Date());
}
