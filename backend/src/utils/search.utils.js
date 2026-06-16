const searchUtils = {
  buildSearchWhere: ({
    search,
    stringFields = [],
    numberFields = [],
    relationFields = [],
    relationStringFields = [],
    relationNestedFields = [],
    filters = {},
  }) => {
    const where = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        where[key] = value;
      }
    });

    if (!search) return where;

    const OR = [];

    // strings directos
    OR.push(
      ...stringFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    );

    // relaciones string
    OR.push(
      ...relationStringFields.map(({ relation, field }) => ({
        [relation]: {
          [field]: {
            contains: search,
            mode: "insensitive",
          },
        },
      })),
    );

    if (!isNaN(Number(search))) {
      const value = Number(search);

      // números directos
      OR.push(
        ...numberFields.map((field) => ({
          [field]: value,
        })),
      );

      // relaciones numéricas simples
      OR.push(
        ...relationFields.map(({ relation, field }) => ({
          [relation]: {
            [field]: value,
          },
        })),
      );

      // relaciones anidadas
      OR.push(
        ...relationNestedFields.map(({ relation, nestedRelation, field }) => ({
          [relation]: {
            [nestedRelation]: {
              [field]: value,
            },
          },
        })),
      );
    }

    where.OR = OR;

    return where;
  },
};

export { searchUtils };
