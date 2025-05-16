import { json2csv } from 'json-2-csv';
import { Exporter } from '../../parsers.js';
import { valuesTransformer } from '../transformers/values.transformer';

export const csvExporter: Exporter = (records, options) => {
  return json2csv(
    records.map(record =>
      valuesTransformer(
        record.params,
        'export',
        options?.properties?.export?.csv,
      ),
    ),
  );
};
