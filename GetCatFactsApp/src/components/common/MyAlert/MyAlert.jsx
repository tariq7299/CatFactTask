// src/components/Alert.js
import { useAlert } from '../../../hooks/AlertProvider'
import Alert from 'react-bootstrap/Alert'

const MyAlert = ({ index }) => {
  const { alerts, removeAlert } = useAlert()
  const { message, variant } = alerts[index]

  return (
      <Alert variant={variant} onClose={() => removeAlert(index)} dismissible>
      {message}
        </Alert>
  )
}

export default MyAlert;
