import { useState, useEffect } from 'react';
import axios from 'axios';
import MyDataTable from '../../components/MyDataTable/MyDataTable';
import UsersCatFactsTable from '../../components/UsersCatFactsTable/UsersCatFactsTable';
import CreateFactsForm from '../CreateFactsForm/CreateFactsForm';
import { useAuth } from "../../hooks/AuthProvider";
import './Home.scss'
import MyButton from "../../components/common/MyButton/MyButton";

function Home() {

    const { logOut, getUserData } = useAuth()
    const username = getUserData()

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
                const response = await axios.get(`https://catfact.ninja/facts?page=${currentPage}&max_length=70`);
                console.log("response", response)
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
        if (internetCatFacts.prev_page_url ) {
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

                <h1 className='greeting-header'>Hello {username} !</h1>

                <div className='tables-container'>

                    <div className='Internetfacts-table-container'>

                        <h1> Here are some Cat facts from the internet</h1>
                        <MyDataTable data={internetCatFacts.data} />
                        <div className='pagination-buttons-container'>
                            <MyButton handleOnClick={handleNextPage} isDisabled={!internetCatFacts.next_page_url} text="Previous" buttonColor="secondary-color" textColor="primary-font-color"></MyButton>

                            <MyButton handleOnClick={handlePrevPage} isDisabled={!internetCatFacts.prev_page_url} text="Next" buttonColor="secondary-color" textColor="primary-font-color"></MyButton>
                            
                        </div>
                    </div>
                    <div>
                        <h1> Here are users cat facts</h1>
                        <UsersCatFactsTable data={usersCatFacts} />
                    </div>
                </div>

                <h1>You can also add your own facts ! Try it</h1>

                <div>
                    <CreateFactsForm setNewFactAdded={setNewFactAdded}></CreateFactsForm>
                </div>

                <div className='footer'>
                    <p>Proudly made by TQ</p>
                    <MyButton buttonColor="secondary-color" textColor="primary-font-color" text='Exit' handleOnClick={handleLogout}>GoodBye</MyButton>
                </div>
                
            </div>
        )}
      </div>

    )
}

export default Home