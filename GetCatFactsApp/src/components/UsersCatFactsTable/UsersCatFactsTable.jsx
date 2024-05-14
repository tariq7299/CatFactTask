import { useMemo } from 'react';
import DataTable from 'react-data-table-component';

const UsersCatFactsTable = ({ data }) => {

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        paddingLeft: '0 8px',
        justifyContent: 'center',
        backgroundColor: '#FFA500',
      },
    },
  }
  

  const columns = [
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
        customStyles={tableCustomStyles}
      />
    )
  }

export default UsersCatFactsTable