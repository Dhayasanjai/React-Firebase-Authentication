import { Link } from 'react-router-dom';

import { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';

import { useHistory } from 'react-router-dom';
const UpdateProfile = () => {
  const { currentUser, resetPassWordHandler, resetEmailHandler } = useAuth();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const promises = [];
    setLoading(true);
    setError('');
    if (currentUser.email !== emailRef.current.value) {
      promises.push(resetEmailHandler(emailRef.current.value));
    }
    if (currentUser.password !== passwordRef.current.value) {
      promises.push(resetPassWordHandler(emailRef.current.value));
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Password doesn't match ");
    }
    Promise.all(promises)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setError(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Body>
          <h2 className="mb-4 w-100 text-center">Update-Profile</h2>
          {error && (
            <Alert variant="danger" className="mb-4 mt-4 ">
              {error}
            </Alert>
          )}

          <Form onSubmit={formSubmitHandler}>
            <Form.Group controlId="email">
              <Form.Label>email </Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>password </Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeHolder="just leave this to keep the same"
              />
            </Form.Group>
            <Form.Group id="confirmPassword">
              <Form.Label>confirm password </Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordRef}
                placeHolder="just leave this to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} type="submit " className="w-100 mt-4 ">
              Reset
            </Button>
          </Form>
        </Card.Body>

        <div className="w-100 mt-1 text-center mb-4">
          <Link to="login">Cancel.</Link>
        </div>
      </Card>
    </div>
  );
};
export default UpdateProfile;
