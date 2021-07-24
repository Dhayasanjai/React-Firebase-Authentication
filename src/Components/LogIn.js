import { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
// import AuthContext from './AuthContext';
import { Link, useHistory } from 'react-router-dom';

const LogIN = () => {
  const history = useHistory();
  const { logInHandler } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      await logInHandler(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Body>
          <h2 className="mb-4 w-100 text-center">Log In </h2>
          {error && (
            <Alert variant="danger" className="mb-4 mt-4 ">
              {error}
            </Alert>
          )}

          <Form onSubmit={formSubmitHandler}>
            <Form.Group controlId="email">
              <Form.Label>email </Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>password </Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>

            <Button disabled={loading} type="submit " className="w-100 mt-4 ">
              Log IN
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 mt-2 text-center mb-2">
          <Link to="/forgot-password"> Forgot password?</Link>
        </div>
        <div className="w-100 mt-2 text-center mb-2">
          Need an account?<Link to="/signup"> Sign Up.</Link>
        </div>
      </Card>
    </div>
  );
};
export default LogIN;
