export function exclude<Model, Key extends keyof Model>(
  model: Model,
  keys: Key[],
): Omit<Model, Key> {
  const clonedModel = { ...model };
  for (const key of keys) {
    delete clonedModel[key];
  }
  return clonedModel;
}
