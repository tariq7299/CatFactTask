import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import './UsersCatFactsTable.scss';
import { ProgressBar } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UsersCatFactsTable = ({ newFactAdded, setNewFactAdded }) => {
  const [usersCatFacts, setUsersCatFacts] = useState([]);

  const [isLoadingUsersFacts, setIsLoadingUsersFacts] = useState(false);
  const [isErrorFetchingUsersCatFacts, setIsErrorFetchingUsersCatFacts] =
    useState(false);

  useEffect(() => {
    const fetchUsersCatFacts = async () => {
      setIsErrorFetchingUsersCatFacts(false);
      setIsLoadingUsersFacts(true);
      try {
          // TASK #1 : Fetch data from an API
          // Use Axios
          // Handle errors
        const response = await axios.get('http://localhost:3000/api/facts');

        console.log('response', response);

        setUsersCatFacts(response.data);
        // Simulate a delay of 0.6 seconds
        setIsLoadingUsersFacts(response.data);

        const loadingTimer = setTimeout(() => {
          setIsLoadingUsersFacts(false);
        }, 600);

        return () => clearTimeout(loadingTimer);
      } catch (error) {
        setIsErrorFetchingUsersCatFacts(true);
        console.error('Error fetching data:', error);
      }

      setIsLoadingUsersFacts(false);
    };

    fetchUsersCatFacts();
    setNewFactAdded(false);
  }, [newFactAdded]);

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
  };

                  // TASK #3 : Display Data using React Data Table Compoenet
                    // Use Sorting, filtring, and paginatation in the table
                    // Use React Data Table Component
  const columns = [
    {
      name: 'User',
      selector: (row) => row.owner,
      sortable: true,
      width: '80px',
      cell: (row) => <div className="custom-font">{row.owner}</div>,
    },
    {
      name: 'Fact',
      selector: (row) => row.catFact,
      sortable: true,
      cell: (row) => <div className="custom-font">{row.catFact}</div>,
    },
  ];

  return (
    <div className="users-cat-facts-table-container">
      <h1> Here are users 🙋 Cat Facts </h1>

      {isErrorFetchingUsersCatFacts ? (
        <div className="error-message">
          Error fetching Users Cat Facts !!! Please contact support !
        </div>
      ) : isLoadingUsersFacts ? (
        <div className="progress-bar-container">
          {' '}
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            barColor="#fff"
            borderColor="#ffda6a"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (

        <DataTable
          columns={columns}
          data={usersCatFacts}
          customStyles={tableCustomStyles}
        />
      )}
    </div>
  );
};

export default UsersCatFactsTable;
