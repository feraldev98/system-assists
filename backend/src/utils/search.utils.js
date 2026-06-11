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
    relationStringFields = [], // 👈 nuevo
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

    // campos string directos
    OR.push(
      ...stringFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    );

    // relaciones string 👈 nuevo
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

    // campos numéricos y relaciones numéricas
    if (!isNaN(Number(search))) {
      const value = Number(search);
      OR.push(
        ...numberFields.map((field) => ({
          [field]: value,
        })),
      );
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