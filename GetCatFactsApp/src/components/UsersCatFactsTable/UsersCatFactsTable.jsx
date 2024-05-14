import { useMemo } from 'react';
import DataTable from 'react-data-table-component';

const UsersCatFactsTable = ({ data }) => {


  const columns = [
    {
      name: 'ID',
      selector: row => row.factId,
      sortable: true,
    },
    {
      name: 'User',
      selector: row => row.owner,
      sortable: true,
    },
    {
      name: 'Fact',
      selector: row => row.catFact,
      sortable: true,
    },
  ];
 
  
    return (

      <DataTable
        columns={columns}
        data={data}
      />
    )
  }

export default UsersCatFactsTable