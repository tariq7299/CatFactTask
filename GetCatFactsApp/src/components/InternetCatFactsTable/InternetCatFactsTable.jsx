import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import './InternetCatFactsTable.scss'

const InternetCatFactsTable = ({ internetCatFacts }) => {

 
  
  const internetCatFactsWithIds = useMemo(() => {
    if (!internetCatFacts) return [];
    return internetCatFacts.map((row, index) => ({ ...row, id: index + 1 }));
  }, [internetCatFacts]);

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
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: "80px",
      cell: (row) => <div className="custom-font">{row.id}</div>,

      
    },
    {
      name: 'Fact',
      selector: row => row.fact,
      sortable: true,
      cell: (row) => <div className="custom-font">{row.fact}</div>,
    },
  ];
 
  
    return (
      <DataTable
        columns={columns}
        data={internetCatFactsWithIds}
        customStyles={tableCustomStyles}
      />
    )
  }

export default InternetCatFactsTable