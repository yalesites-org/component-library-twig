const getDefaultValues = (args) => {
  return Object.entries(args).reduce((acc, [key, value]) => {
    acc[key] = value.defaultValue;
    return acc;
  }, {});
};

export const transformToObjectArray = (
  commaSeparatedString,
  key = 'content',
) => {
  if (!commaSeparatedString || typeof commaSeparatedString !== 'string') {
    return [];
  }

  return commaSeparatedString
    .split(',')
    .map((item) => ({ [key]: item.trim() }))
    .filter((item) => item[key]);
};

export default getDefaultValues;
