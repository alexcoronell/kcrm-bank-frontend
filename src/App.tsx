import { Route, Router } from "wouter";

import Footer from "./components/Shared/Footer";
/* Components */
import Header from "./components/Shared/Header";

import FranchisesFormPage from "./pages/FranchisesFormPage";
/* Pages */
import FranchisesPage from "./pages/FranchisesPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SalesFormPage from "./pages/SalesFormPage";
import SalesPage from "./pages/SalesPage";
import UserTypeFormPage from "./pages/UserTypeFormPage";
import UserTypePage from "./pages/UserTypePage";
import UsersFormPage from "./pages/UsersFormPage";
import UsersPage from "./pages/UsersPage";

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
				<Route path="/sales/create/:id" component={SalesFormPage} />
				<Route path="/users" component={UsersPage} />
				<Route path="/users/create" component={UsersFormPage} />
				<Route path="/users/detail/:id" component={UsersFormPage} />
				<Route path="/user-types" component={UserTypePage} />
				<Route path="/user-types/create" component={UserTypeFormPage} />
				<Route path="/user-types/detail/:id" component={UserTypeFormPage} />
				<Route path="/franchises" component={FranchisesPage} />
				<Route path="/franchises/create" component={FranchisesFormPage} />
				<Route path="/franchises/detail/:id" component={FranchisesFormPage} />
			</Router>
			<Footer />
		</div>
	);
}

export default App;
