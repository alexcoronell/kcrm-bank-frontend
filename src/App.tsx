import { Route, Router } from "wouter";

import { AppProvider } from "./context";

/* Components */
import Header from "./components/layouts/Header";
import FranchisesFormPage from "./pages/private/FranchisesFormPage";
import Footer from "./components/layouts/Footer";

/* Pages */
import DashboardPage from "./pages/private/DashboardPage";
import FranchisesPage from "./pages/private/FranchisesPage";
import LoginPage from "./pages/public/LoginPage";
import MainPage from "./pages/private/MainPage";
import ProductsPage from "./pages/private/ProductsPage";
import ProductsFormPage from "./pages/private/ProductsFormPage";
import SalesFormPage from "./pages/private/SalesFormPage";
import SalesPage from "./pages/private/SalesPage";
import RolesFormPage from "./pages/private/RolesFormPage";
import RolesPage from "./pages/private/RolesPage";
import UsersFormPage from "./pages/private/UsersFormPage";
import UsersPasswordFormPage from "./pages/private/UsersPasswordFormPage";
import UsersPage from "./pages/private/UsersPage";

/* Styles */
import "./App.css";

function App() {
	return (
		<AppProvider>
			<div className="min-h-screen p-0 flex flex-col items-center justify-between">
				<Header />
				<Router>
					<Route path="/" component={MainPage} />
					<Route path="/dashboard" component={DashboardPage} />
					<Route path="/franchises" component={FranchisesPage} />
					<Route path="/franchises/create" component={FranchisesFormPage} />
					<Route path="/franchises/detail/:id" component={FranchisesFormPage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/products" component={ProductsPage} />
					<Route path="/products/create" component={ProductsFormPage} />
					<Route path="/products/detail/:id" component={ProductsFormPage} />
					<Route path="/sales" component={SalesPage} />
					<Route path="/sales/create" component={SalesFormPage} />
					<Route path="/sales/detail/:id" component={SalesFormPage} />
					<Route path="/users" component={UsersPage} />
					<Route path="/users/create" component={UsersFormPage} />
					<Route path="/users/detail/:id" component={UsersFormPage} />
					<Route path="/users/password/:id" component={UsersPasswordFormPage} />
					<Route path="/roles" component={RolesPage} />
					<Route path="/roles/create" component={RolesFormPage} />
					<Route path="/roles/detail/:id" component={RolesFormPage} />
				</Router>
				<Footer />
			</div>
		</AppProvider>
	);
}

export default App;
