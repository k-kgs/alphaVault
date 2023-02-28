import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import AdminDashboard from "./components/adminDashboard/Dashboard";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import store from './redux/store';
import UserDashboard from "./components/userDashboard/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  const renderDashboard = () => {
      if (currentUser[0].userType === 'admin') return <AdminDashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />
      if (currentUser[0].userType === 'user') return <UserDashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />
  }

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/admin-panel' element={currentUser ? renderDashboard() : <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}></Route>
          <Route exact path='/user-panel' element={currentUser ? renderDashboard() : <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
