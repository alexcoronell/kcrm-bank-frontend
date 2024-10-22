import { format } from "date-fns";

export const formatDate = (date: string) => {
  return format(new Date(date), "MMM dd, yyyy");
};

export const formatDateTime = (date: Date) => {
  return format(new Date(date), "MMM dd, yyyy - hh:mmaaa");
};
