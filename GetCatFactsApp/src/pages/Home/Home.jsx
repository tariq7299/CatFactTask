import { useState, useEffect } from 'react';
import axios from 'axios';
import InternetCatFactsTable from '../../components/InternetCatFactsTable/InternetCatFactsTable';
import UsersCatFactsTable from '../../components/UsersCatFactsTable/UsersCatFactsTable';
import CreateFactsForm from '../CreateFactsForm/CreateFactsForm';
import { useAuth } from "../../hooks/AuthProvider";
import './Home.scss'
import MyButton from "../../components/common/MyButton/MyButton";
import { ProgressBar } from 'react-loader-spinner'

function Home() {

    const { logOut, getUserData } = useAuth()
    const username = getUserData()

    const [internetCatFacts, setInternetCatFacts] = useState([]);
    const [usersCatFacts, setUsersCatFacts] = useState([]);
    const [newFactAdded, setNewFactAdded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingUsersFacts, setIsLoadingUsersFacts] = useState(false);
    const [isLoadingInternetFacts, setIsLoadingInternetFacts] = useState(false)
    const [isErrorFetchingInternetCatFacts, setIsErrorFetchingInternetCatFacts] = useState(false);
    const [isErrorFetchingUsersCatFacts, setIsErrorFetchingUsersCatFacts] = useState(false);

    

    useEffect(() => {

        const fetchInternetCatFacts = async () => {
            setIsErrorFetchingInternetCatFacts(false);
            setIsLoadingInternetFacts(true);
            try {
                const response = await axios.get(`https://catfact.ninja/facts?page=${currentPage}&max_length=70`);

                  // Simulate a delay of 0.6 seconds
                  setInternetCatFacts(response.data)
                  const timer = setTimeout(() => {
                    setIsLoadingInternetFacts(false);
                }, 600);

                return () => clearTimeout(timer);
                
            } catch (error) {
                setIsErrorFetchingInternetCatFacts(true);
                console.error('Error fetching data:', error)
            }

            setIsLoadingInternetFacts(false);
        
        };

        fetchInternetCatFacts();
      
      
    }, [currentPage]);

    useEffect(() => {

        const fetchUsersCatFacts = async () => {
            setIsErrorFetchingUsersCatFacts(false);
            setIsLoadingUsersFacts(true);
            try {
                const response = await axios.get('http://localhost:3000/api/facts');

                console.log("response", response)

                setUsersCatFacts(response.data)
                // Simulate a delay of 0.6 seconds
                setIsLoadingUsersFacts(response.data)
                
                const timer = setTimeout(() => {
                    setIsLoadingUsersFacts(false);
                }, 600);

                return () => clearTimeout(timer);

            } catch (error) {
                setIsErrorFetchingUsersCatFacts(true);
                console.error('Error fetching data:', error)
            }

            setIsLoadingUsersFacts(false);
            
        };

        fetchUsersCatFacts();
        setNewFactAdded(false)
    }, [newFactAdded]);
        

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
           
          
            <div>

                <h1 className='greeting-header'>Hello {username} !</h1>

                <div className='tables-container'>

                    <div className='Internetfacts-table-container'>

                        <h1> Here are some Cat facts from the internet</h1>

                        {isErrorFetchingInternetCatFacts ? <div className='error-message'>Error fetching Internet Cat Facts !!! Please contact support !</div> : isLoadingInternetFacts ? (
                            <div className='progress-bar-container'>     <ProgressBar
                            visible={true}
                            height="80"
                            width="80"
                            barColor="#fff"
                            borderColor="#ffda6a"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            /></div>
      
            ) : ( <><InternetCatFactsTable internetCatFacts={internetCatFacts.data} />
            
            <div className='pagination-buttons-container'>
                            <MyButton handleOnClick={handleNextPage} isDisabled={!internetCatFacts.next_page_url} text="Previous" buttonColor="secondary-color" textColor="primary-font-color"></MyButton>

                            <MyButton handleOnClick={handlePrevPage} isDisabled={!internetCatFacts.prev_page_url} text="Next" buttonColor="secondary-color" textColor="primary-font-color"></MyButton>
                            
                        </div></>)}

                        
                    </div>
                    <div className='users-cat-facts-table-container'>
                        <h1> Here are users cat fact </h1>

                   
                        {isErrorFetchingUsersCatFacts ? <div className='error-message'>Error fetching Users Cat Facts !!! Please contact support !</div> :isLoadingUsersFacts ? (
                            <div className='progress-bar-container'>     <ProgressBar
                            visible={true}
                            height="80"
                            width="80"
                            barColor="#fff"
                            borderColor="#ffda6a"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            /></div>
      
            ) : ( <UsersCatFactsTable UsersCatFacts
                usersCatFacts={usersCatFacts} />)}
                    </div>
                </div>

                <div className='add-new-fact-container'>
                    <h1>You can also add your own facts ! Try it</h1>
                    <CreateFactsForm setNewFactAdded={setNewFactAdded}></CreateFactsForm>
                </div>

                <div className='footer'>
                    <p>Proudly made by TQ</p>
                    <MyButton buttonColor="secondary-color" textColor="red" text='Exit' handleOnClick={handleLogout}>GoodBye</MyButton>
                </div>
                
            </div>
      </div>

    )
}

export default Home