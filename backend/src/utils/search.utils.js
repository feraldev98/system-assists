const searchUtils = {
  buildWhere: ({ search, searchFields = [], filters = {} }) => {
    const where = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        where[key] = value;
      }
    });

    if (search) {
      where.OR = searchFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      }));
    }

    return where;
  },

  buildMixedWhere: ({
    search,
    stringFields = [],
    numberFields = [],
    relationFields = [],
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

    // campos string
    OR.push(
      ...stringFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    );

    // campos numéricos
    if (!isNaN(Number(search))) {
      const value = Number(search);

      OR.push(
        ...numberFields.map((field) => ({
          [field]: value,
        })),
      );

      // relaciones
      OR.push(
        ...relationFields.map(({ relation, field }) => ({
          [relation]: {
            [field]: value,
          },
        })),
      );
    }

    where.OR = OR;

    return where;
  },
};

export { searchUtils };
