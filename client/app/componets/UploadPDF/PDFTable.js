import React from 'react';
import PDFTableStyles from './styles/PDFTableStyles';
import { useTable } from 'react-table';

function Table( {columns, data }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function PDFTable(props) {
  console.log('PDFTable...props.data', props.data);

  const columns = React.useMemo(
    () => [
      {
        Header: "File Name",
        accessor: "originalfilename"
      },
      {
        Header: "Mimetype",
        accessor: "mimetype"
      },
      {
        Header: "Size",
        accessor: "size"
      },
      {
        Header: "Created At",
        accessor: "created_at"
      },
      {
        Header: "Original PDF",
        accessor: "filepath"
      },
      {
        Header: "Watermark PDF",
        accessor: "watermarkfilepath"
      },
    ]
  )

  return (
    <PDFTableStyles>
      {props.data.length === 0 ? (
        <p>No PDFs to display.</p>
      ) : (
        <Table 
          columns={columns}
          data={props.data}
        />
      )}
    </PDFTableStyles>
  )
}

export default PDFTable;