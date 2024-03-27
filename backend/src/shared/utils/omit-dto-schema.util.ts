export function omitDtoSchema<T>(dto: T): Omit<T, 'schema'> {
  const result = { ...dto } as Omit<T, 'schema'>;
  delete (result as any).schema;
  return result;
}
