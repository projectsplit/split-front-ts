export const getAllDaysInMonth = (month: number, year: number) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month - 1, i + 1)
    );

export const getNameForCurrentMonth = (
  year: number,
  monthIndex: number,
  date?: number | undefined
) => {
  const currDate = new Date(year, monthIndex, date);
  const dateOptions: Intl.DateTimeFormatOptions = { month: "long" };
  return currDate.toLocaleDateString("en-US", dateOptions);
};