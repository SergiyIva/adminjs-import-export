import { csv2json } from 'json-2-csv';

import { Importer } from '../../parsers.js';
import { saveRecords } from '../../utils.js';
import { valuesTransformer } from '../transformers/values.transformer';
import { unflatten } from 'flat';

export const csvImporter: Importer = async (csvString, resource, options) => {
  const importProperties = options?.properties?.import?.csv;

  const records = csv2json(csvString);

  const unflattenRecords = records.map(record =>
    unflatten<object, Record<string, unknown>>(record),
  );
  const transformedRecords = unflattenRecords.map(record =>
    valuesTransformer(record, 'import', importProperties),
  );

  return saveRecords(transformedRecords, resource, options);
};
