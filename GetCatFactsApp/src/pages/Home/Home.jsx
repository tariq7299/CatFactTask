import { useState, useEffect } from 'react';
import axios from 'axios';
import InternetCatFactsTable from '../../components/InternetCatFactsTable/InternetCatFactsTable';
import UsersCatFactsTable from '../../components/UsersCatFactsTable/UsersCatFactsTable';
import CreateFactsForm from '../../components/CreateFactsForm/CreateFactsForm';
import { useAuth } from "../../hooks/AuthProvider";
import './Home.scss'
import MyButton from "../../components/common/MyButton/MyButton";
import { ProgressBar } from 'react-loader-spinner'

function Home() {

    const { logOut, getUserData } = useAuth()
    const username = getUserData()
    const [newFactAdded, setNewFactAdded] = useState(false);

  
    

  

    function handleLogout() {
        logOut()
        return
    }

    return (
        <div>
           
          
            <div>

                <h1 className='greeting-header'>Hello {username} !</h1>

                <div className='tables-container'>
                    <InternetCatFactsTable  />
                    <UsersCatFactsTable setNewFactAdded={setNewFactAdded} newFactAdded={newFactAdded}/>
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