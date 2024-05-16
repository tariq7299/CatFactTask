import { useState, useEffect } from 'react';
import axios from 'axios';
import InternetCatFactsTable from '../../components/InternetCatFactsTable/InternetCatFactsTable';
import UsersCatFactsTable from '../../components/UsersCatFactsTable/UsersCatFactsTable';
import CreateFactsForm from '../../components/CreateFactsForm/CreateFactsForm';
import { useAuth } from '../../hooks/AuthProvider';
import './Home.scss';
import CatButtonLogOut from '../../components/common/CatButtonLogOut/CatButtonLogOut';

function Home() {
  const { logOut, getUserData } = useAuth();
  const username = getUserData();
  const [newFactAdded, setNewFactAdded] = useState(false);

  function handleLogout() {
    logOut();
    return;
  }

  return (
      <div className='home-page-parent-container'>
        <h1 className="greeting-header">
          Hello 👋 😸 <span>{username}</span> !
        </h1>

        <div className="tables-container">
          <InternetCatFactsTable />
          <UsersCatFactsTable
            setNewFactAdded={setNewFactAdded}
            newFactAdded={newFactAdded}
          />
        </div>

        <div className="add-new-fact-container">
          <h1>You can also add your own facts ! Try it 👇</h1>
          <CreateFactsForm
            newFactAdded={newFactAdded}
            setNewFactAdded={setNewFactAdded}
          ></CreateFactsForm>
        </div>

        <div className="footer">
          <p>Proudly made by TQ</p>
          <CatButtonLogOut text="Exit 😿" handleOnClick={handleLogout}>
            GoodBye
          </CatButtonLogOut>
        </div>
      </div>
  );
}

export default Home;
