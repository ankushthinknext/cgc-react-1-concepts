import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Siderbar";
import Users from "../components/Users";
import FunCounter from "../components/FunCounter";
import FunCities from "../components/FunCities";
import "./dashboard.css";
import Products from "../components/Products";
import Transactions from "../components/Transactions";
import Categories from "../components/Categories";
import Orders from "../components/Orders";
import UserForm from "../components/UserForm";
import DashboardPanel from "../components/DashboardPanel";
import ProductForm from "../components/ProductForm";

function Dashboard(props) {
	return (
		<div class="m-dashboard">
			<div className="content-wrap">
				<div className="d-sidebar">
					<Sidebar />
				</div>
				<div className="d-main">
					<div className="d-top-nav">
						<Header />
					</div>
					<Switch>
						<Route
							path={`${props.match.path}/users/new`}
							component={UserForm}
						/>
						<Route
							path={`${props.match.path}/users/update/:id`}
							component={UserForm}
						/>
						<Route path={`${props.match.path}/users`} component={Users} />
						<Route
							path={`${props.match.path}/products/new`}
							component={ProductForm}
						/>
						<Route
							path={`${props.match.path}/products/update/:id`}
							component={ProductForm}
						/>
						<Route path={`${props.match.path}/products`} component={Products} />
						<Route
							path={`${props.match.path}/transactions`}
							component={Transactions}
						/>
						<Route
							path={`${props.match.path}/categories`}
							component={Categories}
						/>
						<Route path={`${props.match.path}/orders`} component={Orders} />
						<Route
							path={`${props.match.path}/main`}
							component={DashboardPanel}
						/>
					</Switch>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
