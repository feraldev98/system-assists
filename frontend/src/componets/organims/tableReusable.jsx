function Table({
  headers = [],
  data = [],
  renderRow,
  emptyMessage = "No hay datos disponibles",
}) {
  return (
    <div className="overflow-hidden rounded-md border border-borderC bg-white">
      <table className="w-full border-collapse">
        {/* HEADER */}
        <thead className="bg-blueT border-b border-borderC">
          <tr className="text-[1.1em]">
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-left px-6 py-4 text-white font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
      </table>

      {/* SCROLL */}
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full border-collapse">
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) =>
                renderRow(item, index)
              )
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-8 text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { Table };