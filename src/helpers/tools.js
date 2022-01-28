export const getAge = (date) => {
  let dob = new Date(date);
  return Math.floor(
    (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
};

export const getExperience = () => {
  const date = new Date();
  const thisYear = date.getFullYear();
  return thisYear - 2014;
};
