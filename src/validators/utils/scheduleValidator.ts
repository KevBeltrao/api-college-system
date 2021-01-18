export default ({
  startHourInMinutes, endHourInMinutes,
}: {startHourInMinutes: number, endHourInMinutes: number}) => (
  endHourInMinutes > startHourInMinutes
);
