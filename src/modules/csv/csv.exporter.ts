import { json2csv } from 'json-2-csv';
import { Exporter } from '../../parsers.js';
import { emptyValuesTransformer } from '../transformers/empty-values.transformer.js';

export const csvExporter: Exporter = (records, options) => {
  return json2csv(
    records.map(record =>
      emptyValuesTransformer(
        record.params,
        'export',
        options?.properties?.export?.csv
      )
    )
  );
};
