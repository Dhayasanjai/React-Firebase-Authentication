import { Link } from 'react-router-dom';

import { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
// import AuthContext from './AuthContext';
import { useHistory } from 'react-router-dom';
const SignUp = () => {
  const { signUpHandler } = useAuth();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Password doesn't match ");
    }
    try {
      setLoading(true);
      setError('');
      await signUpHandler(emailRef.current.value, passwordRef.current.value);
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
          <h2 className="mb-4 w-100 text-center">Sign Up</h2>
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
            <Form.Group id="confirmPassword">
              <Form.Label>confirm password </Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} />
            </Form.Group>
            <Button disabled={loading} type="submit " className="w-100 mt-4 ">
              SIGN UP
            </Button>
          </Form>
        </Card.Body>

        <div className="w-100 mt-4 text-center mb-4">
          Already have an account? <Link to="login">Log in.</Link>
        </div>
      </Card>
    </div>
  );
};
export default SignUp;
