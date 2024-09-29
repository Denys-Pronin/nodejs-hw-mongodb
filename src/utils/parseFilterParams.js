const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isGender = (type) => ['home', 'work', 'personal'].includes(type);

  if (isGender(type)) return type;
};

const parseFavourite = (favourite) => {
  const isString = typeof favourite === 'string';
  if (!isString) return;

  const parsedBoolean = favourite.toLowerCase() === 'true';

  return parsedBoolean;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedFavourite = parseFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedFavourite,
  };
};
