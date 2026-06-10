const sectionFields = {
  create: ["name", "idGrade"],
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
