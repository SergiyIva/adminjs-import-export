export const valuesTransformer: (
  record: Record<string, any>,
  operation: 'import' | 'export',
  options?: { undefinedValue?: string; nullValue?: string },
) => Record<string, any> = (record, operation, options = {}) => {
  const { nullValue, undefinedValue } = options;
  const transformedEntries = Object.entries(record).map(([key, value]) => {
    if (operation === 'export') {
      if (value instanceof Date) return [key, value.toISOString()];
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
      if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
        return [key, value === 'true'];
      }
      if (Array.isArray(value)) {
        value = value.filter(i => i !== '' && i !== undefined);
        if (value.length === 0) return [key, []];
      }
      if (value === '[]') {
        return [key, []];
      }
      if (isValidDate(value.trim())) {
        return [key, value.trim()];
      }
    }

    return [key, value];
  });

  return Object.fromEntries(transformedEntries);
};

function isValidDate(dateString: string) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}