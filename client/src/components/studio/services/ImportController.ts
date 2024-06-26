import request from 'umi-request';
import { PROXY_HOST } from '@/constants';
import { ImportDataParams, ImportSchemaParams } from '../interface/import';
import { getLocalData } from '../utils/localStorage';

/* Import Data */
export async function importData(params: ImportDataParams) {
  return request(`${PROXY_HOST}/api/import_data`, {
    method: 'POST',
    headers: {
      Authorization: getLocalData('TUGRAPH_TOKEN'),
    },
    data: {
      ...params,
    },
  });
}

/* Import Shcema */
export async function importSchema(params: ImportSchemaParams) {
  return request(`${PROXY_HOST}/api/import_schema`, {
    method: 'POST',
    headers: {
      Authorization: getLocalData('TUGRAPH_TOKEN'),
    },
    data: {
      ...params,
    },
  });
}

/* Import Progress */
export async function importProgress(taskId: string) {
  return request(`${PROXY_HOST}/api/import_progress`, {
    method: 'POST',
    headers: {
      Authorization: getLocalData('TUGRAPH_TOKEN'),
    },
    data: {
      taskId: taskId,
    },
  });
}

/* Import GraphSchema*/
export async function importGraphSchema(params: {
  graph: string;
  schema: any;
  override: boolean;
}) {
  return request(`${PROXY_HOST}/api/import/schema`, {
    method: 'POST',
    headers: {
      Authorization: getLocalData('TUGRAPH_TOKEN'),
    },
    data: {
      ...params,
    },
  });
}
