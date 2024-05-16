import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import './InternetCatFactsTable.scss';
import { ProgressBar } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MyButton from '../common/MyButton/MyButton';

const InternetCatFactsTable = () => {
  const [internetCatFacts, setInternetCatFacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingInternetFacts, setIsLoadingInternetFacts] = useState(false);
  const [isErrorFetchingInternetCatFacts, setIsErrorFetchingInternetCatFacts] =
    useState(false);

  useEffect(() => {
    const fetchInternetCatFacts = async () => {
      setIsErrorFetchingInternetCatFacts(false);
      setIsLoadingInternetFacts(true);
      try {
        // TASK #1 : Fetch data from an API
        // Use Axios
        // Handle errors
        const response = await axios.get(
          `https://catfact.ninja/facts?page=${currentPage}&max_length=70`
        );

        // Simulate a delay of 0.6 seconds
        setInternetCatFacts(response.data);
        const loadingTimer = setTimeout(() => {
          setIsLoadingInternetFacts(false);
        }, 600);

        return () => clearTimeout(loadingTimer);
      } catch (error) {
        setIsErrorFetchingInternetCatFacts(true);
        console.error('Error fetching data:', error);
      }

      setIsLoadingInternetFacts(false);
    };

    fetchInternetCatFacts();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (internetCatFacts.prev_page_url) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (internetCatFacts.next_page_url) {
      setCurrentPage(currentPage + 1);
    }
  };

  const internetCatFactsWithIds = useMemo(() => {
    if (!internetCatFacts.data) return [];
    return internetCatFacts.data.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
  }, [internetCatFacts]);

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
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      width: '85px',
      cell: (row) => <div className="custom-font">{row.id}</div>,
    },
    {
      name: 'Fact',
      selector: (row) => row.fact,
      sortable: true,
      cell: (row) => <div className="custom-font">{row.fact}</div>,
    },
  ];

  return (
    <div className="Internetfacts-table-container">
      <h1>
        {' '}
        Get Ready to Paws 🐾 Here Are Some Whisker-tastic Cat Facts from the
        internet!
      </h1>

      {isErrorFetchingInternetCatFacts ? (
        <div className="error-message">
          Error fetching Internet Cat Facts !!! Please contact support !
        </div>
      ) : isLoadingInternetFacts ? (
        <div className="progress-bar-container">
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
        <>
          <DataTable
            columns={columns}
            data={internetCatFactsWithIds}
            customStyles={tableCustomStyles}
          />

          <div className="pagination-buttons-container">
            <MyButton
              handleOnClick={handleNextPage}
              isDisabled={!internetCatFacts.next_page_url}
              text="Previous"
            ></MyButton>

            <MyButton
              handleOnClick={handlePrevPage}
              isDisabled={!internetCatFacts.prev_page_url}
              text="Next"
            ></MyButton>
          </div>
        </>
      )}
    </div>
  );
};

export default InternetCatFactsTable;
