import { useState, useEffect } from 'react';
import axios from 'axios';
import MyDataTable from '../../components/MyDataTable/MyDataTable';
import UsersCatFactsTable from '../../components/UsersCatFactsTable/UsersCatFactsTable';
import CreateFactsForm from '../CreateFactsForm/CreateFactsForm';
import { useAuth } from "../../hooks/AuthProvider";

function Home() {

    const { logOut } = useAuth()

    const [internetCatFacts, setInternetCatFacts] = useState([]);
    const [usersCatFacts, setUsersCatFacts] = useState([]);
    const [newFactAdded, setNewFactAdded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {

        const fetchUsersCatFacts = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/api/facts');

                console.log("response", response)
                
                setUsersCatFacts(response.data)
            } catch (error) {
                setIsError(true);
                console.error('Error fetching data:', error)
            }

            setIsLoading(false);
        };

        const fetchInternetCatFacts = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const response = await axios.get(`https://catfact.ninja/facts?page=${currentPage}`);
                setInternetCatFacts(response.data)
            } catch (error) {
                setIsError(true);
                console.error('Error fetching data:', error)
            }

            setIsLoading(false);
        };

        fetchInternetCatFacts();
        fetchUsersCatFacts();
        setNewFactAdded(false)
        

    }, [currentPage, newFactAdded]);

    const handlePrevPage = () => {
        if (catFacts.prev_page_url ) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const handleNextPage = () => {
        if (internetCatFacts.next_page_url) {
            setCurrentPage(currentPage + 1);
        }
    };

    function handleLogout() {
        logOut()
        return
    }

    return (
        <div>
            {isError && <div>Error fetching Cat Facts !!!</div>}
            {isLoading ? (
            <div>Loading...</div>
            ) : (
            <div>

            
                <MyDataTable data={internetCatFacts.data} />

                <button onClick={handlePrevPage} disabled={!internetCatFacts.prev_page_url}>
                Previous
                </button>
                <button onClick={handleNextPage} disabled={!internetCatFacts.next_page_url}>
                    Next
                </button>

                <CreateFactsForm setNewFactAdded={setNewFactAdded}></CreateFactsForm>

                <UsersCatFactsTable data={usersCatFacts} />

                <button onClick={handleLogout}>Logout</button>
                
            </div>
        )}
      </div>

    )
}

export default Home