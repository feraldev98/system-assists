function Table({
  headers = [],
  data = [],
  renderRow,
  emptyMessage = "No hay datos disponibles",
}) {
  return (
    <div className="overflow-hidden rounded-md border border-borderC bg-white shadow-sm">
      {/* Scroll horizontal */}
      <div className="overflow-x-auto">
        {/* Scroll vertical */}
        <div className="max-h-100 overflow-y-auto">
          <table className="w-full border-collapse">
            {/* HEADER */}
            <thead className="sticky top-0 z-10 bg-blue">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="
                      min-w-37
                      px-6 py-4
                      text-left
                      text-white
                      font-semibold
                      border-b border-blue-700
                      whitespace-nowrap
                    "
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => renderRow(item, index))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="py-10 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { Table };