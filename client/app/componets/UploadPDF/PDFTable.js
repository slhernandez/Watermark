import React from 'react';
import PDFTableStyles from './styles/PDFTableStyles';
import { useTable } from 'react-table';

const API_ENDPOINT = "http://localhost:3000/"

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

/*const getPDF = async() => {

}*/

function downloadPDF(e, filename) {
  e.preventDefault();
  console.log('downloadPDF...filename', filename);
}

function downloadPDFWatermark(e, watermarkfilepath) {
  e.preventDefault();
  const filename = watermarkfilepath.slice(25);
  console.log('downloadPDFWatermark...filename', filename);
}

function PDFTable(props) {

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
        accessor: "filename",
        Cell: props => {
          return <a 
                  className="download-pdf" 
                  target="_blank" 
                  href={`${API_ENDPOINT}pdf/${props.value}`}
                >
                  Download
                </a>
        }
      },
      {
        Header: "Watermark PDF",
        accessor: "watermarkfilepath",
        Cell: props => {
          return <a 
                  className="download-pdf"
                  target="_blank"
                  href={`${API_ENDPOINT}pdf/watermark/${props.value.slice(25)}`}
                >
                  Download
                </a>
        }
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