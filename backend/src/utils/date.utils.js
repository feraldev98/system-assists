const today = new Date();

const dateUtils = {
  startOfDay: new Date(today.getFullYear(), today.getMonth(), today.getDate()),

  endOfDay: new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  ),
};

export { dateUtils, today };
