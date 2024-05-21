// src/components/Alert.js
import { useAlert } from '../../../hooks/AlertProvider';
import Alert from 'react-bootstrap/Alert';
import './CatAlert.scss';

const CatAlert = ({ index, alertId }) => {
  const { removeAlert } = useAlert();
  const { message, variant } = alerts[index];

  return (
    <div className="alert-wrapper">
      <Alert
        className="custom-font"
        variant={variant}
        onClose={() => removeAlert(alertId)}
        dismissible
      >
        {message}
      </Alert>
    </div>
  );
};

export default CatAlert;
