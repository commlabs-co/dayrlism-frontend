export const getAge = (date: string): number => {
  const dob = new Date(date);
  return Math.floor(
    (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
};

export const getExperience = (startYear: number): number => {
  return new Date().getFullYear() - startYear;
};
