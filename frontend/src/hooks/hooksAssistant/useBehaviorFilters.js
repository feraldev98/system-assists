export function useBehaviorFilters(records = []) {

  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [behaviorGrade, setBehaviorGrade] = useState("");
  const [behaviorType, setBehaviorType] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredRecords = useMemo(() => {

    return records.filter((record) => {

      const matchesSearch =
        record.student.toLowerCase().includes(search.toLowerCase()) ||
        record.dni.includes(search);

      const matchesGrade =
        grade === "" ||
        record.grade === grade;

      const matchesSection =
        section === "" ||
        record.section === section;

      const matchesBehaviorGrade =
        behaviorGrade === "" ||
        record.behaviorGrade === behaviorGrade;

      const matchesBehaviorType =
        behaviorType === "" ||
        record.type === behaviorType;

      const matchesDate =
        dateFilter === "" ||
        matchesDateFilter(record.date, dateFilter);

      return (
        matchesSearch &&
        matchesGrade &&
        matchesSection &&
        matchesBehaviorGrade &&
        matchesBehaviorType &&
        matchesDate
      );

    });

  }, [
    records,
    search,
    grade,
    section,
    behaviorGrade,
    behaviorType,
    dateFilter,
  ]);

  return {
    search,
    setSearch,

    grade,
    setGrade,

    section,
    setSection,

    behaviorGrade,
    setBehaviorGrade,

    behaviorType,
    setBehaviorType,

    dateFilter,
    setDateFilter,

    filteredRecords,
  };
}