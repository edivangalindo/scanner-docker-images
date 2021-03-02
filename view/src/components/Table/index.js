import React from 'react';
import { useTable, useSortBy } from 'react-table';
import Styles from './styles';

const T = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                if (cell.column.id === "Severity") {
                  switch (cell.value) {
                    case "LOW":
                      return <td style={{ color: '#00008B', fontWeight: 'bold' }} {...cell.getCellProps()}>{cell.render('Cell')}</td>

                    case "MEDIUM":
                      return <td style={{ color: '#FFA500', fontWeight: 'bold' }} {...cell.getCellProps()}>{cell.render('Cell')}</td>

                    case "HIGH":
                      return <td style={{ color: '#FF6347', fontWeight: 'bold' }} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      
                    case "CRITICAL":
                      return <td style={{ color: '#FF0000', fontWeight: 'bold' }} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    default:
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  }
                }

                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const Table = ({ columns, results }) => {
  const getSection = data => {
    if (!data.Vulnerabilities)
      return (
        <div key={data.Target}>
          <h3>Target: {data.Target}</h3>
          <h3>Type: {data.Type}</h3>
          <h3>No vulnerabilities were found ;)</h3>
        </div>
      );
    return (
      <div key={data.Target}>
        <h3>Target: {data.Target}</h3>
        <h3>Type: {data.Type}</h3>
        <T columns={columns} data={data.Vulnerabilities} />
      </div>
    );
  }

  return (
    <Styles>
      {
        Object.keys(results).map(function (key, index) {
          return getSection(results[key][0]);
        })
      }
    </Styles>
  );
}

export default Table;