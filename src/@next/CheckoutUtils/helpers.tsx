export const findOptionByField = (options: any, value: any, field: any) =>
  options.find((option: { [x: string]: any }) => {
    if (field === "id") {
      return Number(option[field]) === Number(value);
    }
    return String(option[field]) === String(value);
  });
