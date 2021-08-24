export const Table = ({
  rows,
  setRows,
  columns,
  setColumns,
}) =>
  (
    <>
      {(setRows && setColumns) ? <>
        <div className='row-controls'>
          <button onClick={() => setRows((rows === 1) ? 1 : rows - 1)}>-</button>
          <button onClick={() => setRows(rows + 1)}>+</button>
        </div>
        <div className='column-controls'>
          <button onClick={() => setColumns((columns === 1) ? 1 : columns - 1)}>-</button>
          <button onClick={() => setColumns(columns + 1)}>+</button>
        </div>
      </> : null}
      <table>
        <tbody>
        {[...Array(rows)].map((x, i) =>
          <tr key={i} style={{ height: 100 / rows + '%' }}>
            {[...Array(columns)].map((y, j) =>
              <td key={j} style={{ width: 100 / columns + '%' }}>
              </td>,
            )}
          </tr>,
        )}
        </tbody>
      </table>
    </>
  );



