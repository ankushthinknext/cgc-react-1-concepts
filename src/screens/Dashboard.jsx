import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Siderbar";
import Users from "../components/Users";
import "./dashboard.css";

function Dashboard(props) {
	let { path, url } = useRouteMatch();
	return (
		<div class="m-dashboard">
			<div className="d-top-nav">
				<Header />
			</div>
			<div className="content-wrap">
				<div className="d-sidebar">
					<Sidebar />
				</div>
				<div className="d-main">
					<Route path={`${props.match.url}/users`} component={Users} />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
