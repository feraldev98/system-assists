const sectionFields = {
  create: {
    idSection: true,
    name: true,
    grade: {
      select: {
        idGrade: true,
        level: true,
      },
    },
  },
  update: ["name", "idGrade"],
  select: {
    idSection: true,
    name: true,
    grade: {
      select: {
        idGrade: true,
        level: true,
      },
    },
  },
  sort: ["name", "idGrade", "idSection"],
  search: ["name", "idGrade", "idSection"],
};

export { sectionFields };
