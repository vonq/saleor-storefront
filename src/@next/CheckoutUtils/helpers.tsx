export const findOptionById = (options: any, id: any) =>
  options.find((option: { id: any }) => Number(option.id) === Number(id));
