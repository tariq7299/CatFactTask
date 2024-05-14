import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import './MyDataTable.scss'

const MyDataTable = ({ data }) => {

 
  
  const dataWithIds = useMemo(() => {
    if (!data) return [];
    return data.map((row, index) => ({ ...row, id: index + 1 }));
  }, [data]);
  console.log(dataWithIds)

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        paddingLeft: '0 8px',
        justifyContent: 'center',
        backgroundColor: '#FFA500',
        // borderRadius: "20px"

      },
    },
  }
  


  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      // maxWidth: "20px", 
    },
    {
      name: 'Fact',
      selector: row => row.fact,
      sortable: true,
      // style: { background: "orange" }, 
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