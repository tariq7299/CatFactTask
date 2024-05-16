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

const UsersCatFactsTable = ({ newFactAdded, setNewFactAdded }) => {

  const { getToken , getUserData } = useAuth();
  
  const { register, handleSubmit, errors, reset } = useForm();


  const token = useMemo(() => {
    return getToken();
  }, [getToken]);

  const username = useMemo(() => {
    return getUserData();
  }, [getUserData]);
  console.log("username", username)

  const { alerts, addAlert } = useAlert();

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


  const handleDeletUserCatFact = async (factId) => {

      try {

        console.log(factId)

 
        const response = await axios.delete(`http://localhost:3000/api/facts/${factId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("usersFactsBeforeUpdating", usersCatFacts)
        if (response.status === 200 || response.status === 204) {
          addAlert('Cat Fact Deleted 👍', 'success')
           
          setUsersCatFacts(usersCatFacts.filter(fact => fact.id !== factId));
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
      

   
    
  }


  function handleEditCatFact(factId) {
    console.log("usersCatFacts", usersCatFacts)
    setUsersCatFacts(usersCatFacts.map((userFact) => {
        if (userFact.factId === factId)  {
            // console.log("post.editMode", userFact.editMode)
            return {...userFact, editMode: !userFact.editMode ?? true}
        } else {
            return userFact;
        }
    }))
  }

  const onSubmit = async (data, factId) => {
    try {
      reset()
      // Extract the value of the textarea with the key corresponding to the factId
      const updatedCatFact = data[`user-cat-fact-${factId}`];
  
      // If the updatedCatFact is not found, return early
      if (!updatedCatFact) {
        return;
      }
  
      // Prepare the data to be sent in the PUT request
      const requestData = { updatedCatFact };
  
      // Make the PUT request to update the cat fact
      const response = await axios.put(`http://localhost:3000/api/facts/${factId}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      // Check the response status and handle accordingly
      if (response.status === 200 || response.status === 204) {
        // Update the UI or perform any necessary actions
        addAlert('Cat Fact updated 👍', 'success');
        setNewFactAdded(!newFactAdded);
      } else {
        // Throw an error if the response status is unexpected
        throw new Error();
      }
    } catch (error) {
      // Handle errors
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
      width: '85px',
      cell: (row) => <div className="custom-font">{row.owner}</div>,
    },
    {
      name: 'Fact',
      selector: (row) => row.catFact,
      sortable: true,
      cell: (row) => (
        <div className="custom-font">
          {row.editMode ? (
            <textarea type="text"
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
            <><button onClick={() => handleDeletUserCatFact(row.factId)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
          </button>
          <button onClick={() => handleEditCatFact(row.factId)}>
          {row.editMode ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg>}
        </button> {row.editMode && <button  onClick={handleSubmit((data) =>onSubmit(data, row.factId))}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-floppy2-fill" viewBox="0 0 16 16">
  <path d="M12 2h-2v3h2z"/>
  <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1"/>
</svg></button>}</>
            
          ) : (
            ''
          )}
        </div>
      ),
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
