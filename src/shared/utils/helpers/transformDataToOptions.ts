export const transformDataToOptions = <T>(
  data: T[] | undefined,
  labelTransform: (item: T) => string,
  valueTransform: (item: T) => string
): { label: string; value: string }[] => {
  return (
    data?.map((item) => ({
      label: labelTransform(item),
      value: valueTransform(item),
    })) || []
  );
};
