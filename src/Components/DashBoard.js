import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';

const DashBoard = () => {
  const { currentUser, logOut } = useAuth();
  const [error, setError] = useState('');
  const logOutHandler = async () => {
    try {
      setError('');
      await logOut();
    } catch {
      setError('failed to Logout');
    }
  };
  return (
    <Card className="w-100  p-2" style={{ maxWidth: '400px' }}>
      <h1 className="text-center mb-2"> Profile </h1>
      {error && <Alert variant="danger ">{error}</Alert>}
      <Card.Body>
        <h4 className="mt-2">
          <strong>Email:</strong> {currentUser.email}
        </h4>
        <Link
          to="/update-profile"
          className="mb-1 mt-4 w-100 bg-primary text-white btn btn.primary"
        >
          Update-Profile
        </Link>
      </Card.Body>
      <Button
        variant="link"
        target="_blank"
        onClick={logOutHandler}
        className="text-center"
      >
        Log Out
      </Button>
    </Card>
  );
};
export default DashBoard;
