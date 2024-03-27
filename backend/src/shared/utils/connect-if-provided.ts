export function connectIdIfProvided(id: number | undefined | null) {
  return id
    ? {
        connect: {
          id,
        },
      }
    : undefined;
}
