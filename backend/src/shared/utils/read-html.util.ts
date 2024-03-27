import { readFile } from 'fs/promises';
import { resolve } from 'path';

export const readHtml = (path: string): Promise<string> => {
  return readFile(resolve(path), 'utf-8');
};
