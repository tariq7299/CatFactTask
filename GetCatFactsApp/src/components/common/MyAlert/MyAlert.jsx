// src/components/Alert.js
import { useAlert } from '../../../hooks/AlertProvider'
import Alert from 'react-bootstrap/Alert'

const MyAlert = ({ index, alertId }) => {
  const { alerts, removeAlert } = useAlert()
  const { message, variant } = alerts[index]

  return (
      <Alert key={index} className='custom-font' variant={variant} onClose={() => removeAlert(alertId)} dismissible>
      {message}
        </Alert>
  )
}

export default MyAlert;
