const errorHandler = (error, addAlert, navigate) => {

  if (error.response && error.response.status === 401 && error.response.data.message === 'Invalid token') {
    // Redirect to login page or handle unauthorized access
    addAlert('Unauthorized access, please log in first !!', 'danger');
    navigate('/login');
  } else if (error.response && error.response.status === 401 && error.response.data.message === 'Invalid credentials') {
    addAlert('username/password is wrong ⛔', 'danger');
  } else {
    // Handle other errors (e.g., show an error message)
    console.error('Something bad happened! Please contact support.');
    addAlert('Something bad happened ! Please contact support !', 'danger');
  }
};

export default errorHandler;