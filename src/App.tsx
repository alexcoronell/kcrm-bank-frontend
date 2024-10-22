import { Router, Route } from "wouter";

/* Components */
import Header from "./components/Shared/Header";
import Footer from "./components/Shared/Footer";

/* Pages */
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SalesPage from "./pages/SalesPage";
import SalesFormPage from "./pages/SalesFormPage";
import UsersPage from "./pages/UsersPage";
import UsersFormPage from "./pages/UsersFormPage";

import "./App.css";

function App() {
  return (
    <div className="min-h-screen p-0 flex flex-col items-center justify-between">
      <Header />
      <Router>
        <Route path="/" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/sales" component={SalesPage} />
        <Route path="/sales/detail" component={SalesFormPage} />
        <Route path="/sales/create" component={SalesFormPage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/users/create" component={UsersFormPage} />
        <Route path="/users/detail" component={UsersFormPage} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
