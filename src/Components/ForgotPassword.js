import { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';

import { Link } from 'react-router-dom';

const ForGotPassWord = () => {
  const { forgotPassWordHandler } = useAuth();

  const emailRef = useRef();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      setMessage('');
      await forgotPassWordHandler(emailRef.current.value);
      setMessage('Check your mail  for further Process');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Body>
          <h2 className="mb-4 w-100 text-center">Password Reset </h2>
          {error && (
            <Alert variant="danger" className="mb-4 mt-4 ">
              {error}
            </Alert>
          )}
          {message && (
            <Alert variant="success" className="mb-4 mt-4 ">
              {message}
            </Alert>
          )}

          <Form onSubmit={formSubmitHandler}>
            <Form.Group controlId="email">
              <Form.Label>email </Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>

            <Button disabled={loading} type="submit " className="w-100 mt-4 ">
              Submit
            </Button>
          </Form>
        </Card.Body>

        <div className="w-100 mt-2 text-center mb-2">
          <Link to="/login"> Log In</Link>
        </div>
        <div className="w-100 mt-2 text-center mb-2">
          <Link to="/signup">Need an Account Sign Up.</Link>
        </div>
      </Card>
    </div>
  );
};
export default ForGotPassWord;
