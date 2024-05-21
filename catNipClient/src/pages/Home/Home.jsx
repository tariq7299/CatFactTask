import { useState, useEffect } from 'react';
import axios from 'axios';
import InternetCatFactsTable from '../../components/InternetCatFactsTable/InternetCatFactsTable';
import UsersCatFactsTable from '../../components/UsersCatFactsTable/UsersCatFactsTable';
import CreateFactsForm from '../../components/CreateFactsForm/CreateFactsForm';
import { useAuth } from '../../hooks/AuthProvider';
import './Home.scss';
import CatButtonLogOut from '../../components/common/CatButtonLogOut/CatButtonLogOut';

// Importing Users Facts Provider
import UsersFactsProvider from '../../hooks/UsersFactsProvider';

function Home() {
  const { logOut, getUserData } = useAuth();
  const username = getUserData();

  function handleLogout() {
    logOut();
    return;
  }

  return (
    <div className="home-page-parent-container">
      <h1 className="greeting-header">
        Hello 👋 😸 <span>{username}</span> !
      </h1>

      {/* This will provide the usersFacts to UsersCatFactsTable and CreateFactsForm */}
      <UsersFactsProvider>
        <div className="tables-container">
          <InternetCatFactsTable />
          <UsersCatFactsTable />
        </div>

        <div className="add-new-fact-container">
          <h1>You can also add your own facts ! Try it 👇</h1>
          <CreateFactsForm></CreateFactsForm>
        </div>
      </UsersFactsProvider>

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
