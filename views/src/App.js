import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserCalendar from './components/UserCalendar';
import AdminCalendar from './components/AdminCalendar';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/calendar" component={UserCalendar} />
        <Route exact path="/admincalendar" component={AdminCalendar} />
      </Switch>
    </Router>
  );
}

export default App;
