function DespliegueDescription ({
  openRowId,
  closeRow,
  openRow,
  behavior
}) {
  return(
    <>
      {openRowId === behavior.id ? (
    <div>
      <p className="text-gray-700 text-sm w-60">
        {behavior.behavior.description}
      </p>

      <button
        onClick={() => closeRow()}
        className="text-blue-600 text-sm hover:underline mt-1"
      >
        Ver menos
      </button>
    </div>
  ) : (
    <div>
      <p className="truncate text-sm text-black/50 w-50">
        {behavior.behavior.description}
      </p>

      <button
        onClick={() => openRow(behavior.id)}
        className="text-blue-600 text-sm hover:underline"
      >
        Ver más
      </button>
    </div>
  )}
    </>
  )
}

export {DespliegueDescription}