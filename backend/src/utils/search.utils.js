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
};

export { searchUtils };
