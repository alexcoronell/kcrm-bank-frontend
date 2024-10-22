import { Router, Route } from "wouter";

/* Components */
import Header from "./components/Shared/Header";
import Footer from "./components/Shared/Footer";

/* Pages */
import Login from "./pages/Login";
import Main from "./pages/Main";
import Sales from "./pages/Sales";
import SalesForm from "./pages/SalesForm";
import Users from "./pages/Users";
import UsersForm from "./pages/UsersForm";

import "./App.css";

function App() {
  return (
    <div className="min-h-screen p-0 flex flex-col items-center justify-between">
      <Header />
      <Router>
        <Route path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/sales" component={Sales} />
        <Route path="/sales/detail" component={SalesForm} />
        <Route path="/sales/create" component={SalesForm} />
        <Route path="/users" component={Users} />
        <Route path="/users/detail" component={UsersForm} />
        <Route path="/users/create" component={UsersForm} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
