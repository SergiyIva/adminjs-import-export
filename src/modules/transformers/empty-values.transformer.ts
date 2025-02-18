export const emptyValuesTransformer: (
  record: Record<string, any>,
  operation: 'import' | 'export',
  options?: { undefinedValue?: string; nullValue?: string }
) => Record<string, any> = (record, operation, options = {}) => {
  const { nullValue, undefinedValue } = options;
  const transformedEntries = Object.entries(record).map(([key, value]) => {
    if (operation === 'export') {
      if (nullValue !== undefined && value === null) {
        return [key, nullValue];
      }
      if (undefinedValue !== undefined && value === undefined) {
        return [key, undefinedValue];
      }
    }
    if (operation === 'import') {
      if (nullValue !== undefined && value === nullValue) {
        return [key, null];
      }
      if (undefinedValue !== undefined && value === undefinedValue) {
        return [key, undefined];
      }
      if(value === "true" || value === "false") {
        return [key, value === "true"];
      }
      if (value === "[]"){
        return [key, []];
      }
    }

    return [key, value];
  });

  return Object.fromEntries(transformedEntries);
};
