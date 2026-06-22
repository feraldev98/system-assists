const incidentcatalogFields = {
  create: {
    idIncidentCatalog: true,
    name: true,
    description: true,
    type: true,
    pointsDeducted: true,
  },
  update: ["name", "description", "type", "pointsDeducted"],
  select: {
    idIncidentCatalog: true,
    name: true,
    description: true,
    type: true,
    pointsDeducted: true,
  },
  sort: ["name", "type", "pointsDeducted"],
  search: [
    "idIncidentCatalog",
    "name",
    "description",
    "type",
    "pointsDeducted",
  ],
  type: ["LEVE", "GRAVE", "MUY_GRAVE"],
};

export { incidentcatalogFields };
