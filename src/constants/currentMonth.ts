export const month = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let month = months[d.getMonth() - 1].toLowerCase();
  let year = d.getFullYear().toString().slice(-2);

  return month + year;
};
