import { Route, Router } from "wouter";

import Footer from "./components/Shared/Footer";
/* Components */
import Header from "./components/Shared/Header";

import FranchisesFormPage from "./pages/private/FranchisesFormPage";
/* Pages */
import FranchisesPage from "./pages/private/FranchisesPage";
import LoginPage from "./pages/public/LoginPage";
import MainPage from "./pages/private/MainPage";
import ProductsPage from "./pages/private/ProductsPage";
import ProductsFormPage from "./pages/private/ProductsFormPage";
import SalesFormPage from "./pages/private/SalesFormPage";
import SalesPage from "./pages/private/SalesPage";
import UserTypeFormPage from "./pages/private/UserTypeFormPage";
import UserTypePage from "./pages/private/UserTypePage";
import UsersFormPage from "./pages/private/UsersFormPage";
import UsersPage from "./pages/private/UsersPage";

import "./App.css";

function App() {
  return (
    <div className="min-h-screen p-0 flex flex-col items-center justify-between">
      <Header />
      <Router>
        <Route path="/" component={MainPage} />
        <Route path="/franchises" component={FranchisesPage} />
        <Route path="/franchises/create" component={FranchisesFormPage} />
        <Route path="/franchises/detail/:id" component={FranchisesFormPage} />
        <Route path="/login" component={LoginPage} />
		<Route path="/products" component={ProductsPage} />
        <Route path="/products/create" component={ProductsFormPage} />
        <Route path="/products/detail/:id" component={ProductsFormPage} />
        <Route path="/sales" component={SalesPage} />
        <Route path="/sales/detail" component={SalesFormPage} />
        <Route path="/sales/create/:id" component={SalesFormPage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/users/create" component={UsersFormPage} />
        <Route path="/users/detail/:id" component={UsersFormPage} />
        <Route path="/user-types" component={UserTypePage} />
        <Route path="/user-types/create" component={UserTypeFormPage} />
        <Route path="/user-types/detail/:id" component={UserTypeFormPage} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
