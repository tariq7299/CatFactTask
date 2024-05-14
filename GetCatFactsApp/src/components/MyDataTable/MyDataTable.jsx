import { useMemo } from 'react';
import DataTable from 'react-data-table-component';

const MyDataTable = ({ data }) => {

 
  
  const dataWithIds = useMemo(() => {
    if (!data) return [];
    return data.map((row, index) => ({ ...row, id: index + 1 }));
  }, [data]);
  console.log(dataWithIds)


  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Fact',
      selector: row => row.fact,
      sortable: true,
    },
  ];
 
  
    return (
      <DataTable
        columns={columns}
        data={dataWithIds}
      />
    )
  }

export default MyDataTable