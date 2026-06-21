const mappersUtils = {
  formatClassroom: (row) => {
    return {
      idClassroomStudent: row.idClassroomStudent,
      section: row.classroom?.section?.name ?? null,
      grade: row.classroom?.section?.grade?.level ?? null,
    };
  },
};

export { mappersUtils };
