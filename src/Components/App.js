import DashBoard from './DashBoard';
import SignUp from './SignUp';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LogIn from '../Components/LogIn';
import PrivateRoute from './PrivateRoute';
import ForGotPassWord from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
const App = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center  font-bold"
      style={{ minHeight: '100vh' }}
    >
      <Switch>
        <PrivateRoute exact path="/" component={DashBoard}></PrivateRoute>
        <Route path="/signup">
          <SignUp></SignUp>
        </Route>
        <Route path="/login">
          <LogIn></LogIn>
        </Route>
        <Route path="/forgot-password">
          <ForGotPassWord></ForGotPassWord>
        </Route>
        <PrivateRoute
          path="/update-profile"
          component={UpdateProfile}
        ></PrivateRoute>
      </Switch>
    </Container>
  );
};
export default App;
