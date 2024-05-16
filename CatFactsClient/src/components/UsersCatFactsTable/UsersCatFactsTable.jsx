import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import './UsersCatFactsTable.scss';
import { ProgressBar } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/AuthProvider';
import { useAlert } from '../../hooks/AlertProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ExitIcon from '../common/Icons/ExitIcon';
import PencilIcon from '../common/Icons/PencilIcon';
import TrashIcon from '../common/Icons/TrashIcon';
import SaveIcon from '../common/Icons/SaveIcon';

// THis the second table where it will show the cat facts users added to the site, so it is not from a public API and instead it is from my server and DB
const UsersCatFactsTable = ({ newFactAdded, setNewFactAdded }) => {
  const { getToken, getUserData } = useAuth();

  const { register, handleSubmit, reset } = useForm();

  const token = useMemo(() => {
    return getToken();
  }, [getToken]);

  const username = useMemo(() => {
    return getUserData();
  }, [getUserData]);

  const { addAlert } = useAlert();

  const navigate = useNavigate();

  const [usersCatFacts, setUsersCatFacts] = useState([]);

  const [isLoadingUsersFacts, setIsLoadingUsersFacts] = useState(false);
  const [isErrorFetchingUsersCatFacts, setIsErrorFetchingUsersCatFacts] =
    useState(false);

  useEffect(() => {
    const fetchUsersCatFacts = async () => {
      setIsErrorFetchingUsersCatFacts(false);
      setIsLoadingUsersFacts(true);
      try {
        const response = await axios.get('http://localhost:3000/api/facts');

        setUsersCatFacts(response.data);
        // Simulate a delay of 0.6 seconds
        setIsLoadingUsersFacts(true);

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
  }, [newFactAdded]);

  // THis funcion will handle when users click on the delete button to try to delete a fact !
  // It will send DELETE request to server with the fact ID
  const handleDeletUserCatFact = async (factId) => {
    try {

      const response = await axios.delete(
        `http://localhost:3000/api/facts/${factId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        addAlert('Cat Fact Deleted ❗️', 'warning');

        setUsersCatFacts(usersCatFacts.filter((fact) => fact.id !== factId));
        setNewFactAdded(!newFactAdded);
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page or handle unauthorized access
        console.error('User UnAuthorized ... redirecting to login page');
        navigate('/login');
      } else {
        // Handle other errors (e.g., show an error message)
        console.error('Something bad happened! Please contact support.');
        addAlert('Something bad happened ! Please contact support !', 'danger');
      }
    }
  };

  function handleEditCatFact(factId) {
    setUsersCatFacts(
      usersCatFacts.map((userFact) => {
        if (userFact.factId === factId) {
          return { ...userFact, editMode: !userFact.editMode ?? true };
        } else {
          return userFact;
        }
      })
    );
  }

  const handleSubmittingUpdatedFact = async (data, factId) => {
    try {
      reset();
      // Extract the value of the textarea with the key corresponding to the factId
      const updatedCatFact = data[`user-cat-fact-${factId}`];

      // If the updatedCatFact is not found, return early
      if (!updatedCatFact) {
        return;
      }

      // Prepare the data to be sent in the PUT request
      const requestData = { updatedCatFact };

      // Make the PUT request to update the cat fact
      const response = await axios.put(
        `http://localhost:3000/api/facts/${factId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        addAlert('Cat Fact updated 👍', 'info');
        setNewFactAdded(!newFactAdded);
      } else {
        // Throw an error if the response status is unexpected
        throw new Error();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page or handle unauthorized access
        console.error('User Unauthorized ... redirecting to login page');
        navigate('/login');
      } else {
        // Handle other errors (e.g., show an error message)
        console.error('Something bad happened! Please contact support.');
        addAlert('Something bad happened! Please contact support!', 'danger');
      }
    }
  };

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: '28px',
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
      width: '85px',
      cell: (row) => (
        <div className="row-owner-wrapper custom-font">
          {row.owner.toLowerCase() === username ? <span>Me</span> : row.owner}
        </div>
      ),
    },
    {
      name: 'Fact',
      selector: (row) => row.catFact,
      sortable: true,
      cell: (row) => (
        <div className="custom-font">
          {row.editMode ? (
            <textarea
              type="text"
              id={`user-cat-fact-${row.factId}`}
              name={`user-cat-fact-${row.factId}`}
              defaultValue={row.catFact}
              {...register(`user-cat-fact-${row.factId}`, { required: true })}
            ></textarea>
          ) : (
            <>{row.catFact}</>
          )}
        </div>
      ),
    },
    {
      name: 'Action',
      width: '85px',
      cell: (row) => (
        <div className="icon-button-container custom-font">
          {row.owner.toLowerCase() === username ? (
            <>
              <button onClick={() => handleDeletUserCatFact(row.factId)}>
                <TrashIcon />
              </button>
              <button onClick={() => handleEditCatFact(row.factId)}>
                {row.editMode ? <ExitIcon /> : <PencilIcon />}
              </button>{' '}
              {row.editMode && (
                <button
                  onClick={handleSubmit((data) => handleSubmittingUpdatedFact(data, row.factId))}
                >
                  <SaveIcon />
                </button>
              )}
            </>
          ) : (
            ''
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="users-cat-facts-table-container">
      <h1>
        {' '}
        Want more Paw-some Adventure?<br></br> Dive into Our User-Generated Cat
        Facts! 🙋{' '}
      </h1>

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
