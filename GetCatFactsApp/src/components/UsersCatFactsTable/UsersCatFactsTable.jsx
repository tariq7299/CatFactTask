import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import './UsersCatFactsTable.scss'

const UsersCatFactsTable = ({ usersCatFacts }) => {

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
      width: "80px", 
      cell: (row) => <div className="custom-font">{row.owner}</div>,
      
    },
    {
      name: 'Fact',
      selector: row => row.catFact,
      sortable: true,
      cell: (row) => <div className="custom-font">{row.catFact}</div>,
    },
  ];
 
  
    return (

      <DataTable
        columns={columns}
        data={usersCatFacts}
        customStyles={tableCustomStyles}
      />
    )
  }

export default UsersCatFactsTable