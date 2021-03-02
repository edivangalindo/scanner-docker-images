import React from 'react';

const useColumns = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Library name',
            accessor: 'PkgName',
          },
          {
            Header: 'Vulnerability ID',
            accessor: 'VulnerabilityID',
          },
          {
            Header: 'Severity',
            accessor: 'Severity',
          },
          {
            Header: 'Installed version',
            accessor: 'InstalledVersion',
          },
          {
            Header: 'Fixed version',
            accessor: 'FixedVersion',
          },
          {
            Header: 'Title',
            accessor: 'Title',
          },
        ],
      },
    ],
    []
  );

  return columns;
}

export default useColumns;