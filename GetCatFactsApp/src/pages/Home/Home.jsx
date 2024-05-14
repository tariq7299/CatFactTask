import { useState, useEffect } from 'react';
import axios from 'axios';
import MyDataTable from '../../components/common/MyDataTable/MyDataTable';
import { useAuth } from "../../hooks/AuthProvider";

function Home() {

    const { logOut } = useAuth()

    const [catFacts, setCatFacts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {

        const fetchCatFacts = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const response = await axios.get(`https://catfact.ninja/facts?page=${currentPage}`);
                // const catfact = response.data
                
                setCatFacts(response.data)
            } catch (error) {
                setIsError(true);
                console.error('Error fetching data:', error)
            }

            setIsLoading(false);
        };

        fetchCatFacts();

    }, [currentPage]);

    const handlePrevPage = () => {
        if (catFacts.prev_page_url ) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const handleNextPage = () => {
        if (catFacts.next_page_url) {
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

            
                <MyDataTable data={catFacts.data} />

                <button onClick={handlePrevPage} disabled={!catFacts.prev_page_url}>
                Previous
                </button>
                <button onClick={handleNextPage} disabled={!catFacts.next_page_url}>
                    Next
                </button>

                <a onClick={handleLogout}>Logout</a>
                
            </div>
        )}
      </div>

    )
}

export default Home