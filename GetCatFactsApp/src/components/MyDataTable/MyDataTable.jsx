import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import './MyDataTable.scss'

const MyDataTable = ({ data }) => {

 
  
  const dataWithIds = useMemo(() => {
    if (!data) return [];
    return data.map((row, index) => ({ ...row, id: index + 1 }));
  }, [data]);

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
      cell: (row) => <div className="id-cell custom-font">{row.id}</div>,

      
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
        data={dataWithIds}
        customStyles={tableCustomStyles}
      />
    )
  }

export default MyDataTable