import React from "react";
import Login from "../components/Login";
import "./login.css";

function LoginPanel() {
	return (
		<div className="login-screen">
			<div className="left">
				<img src="https://picsum.photos/1000" alt="" />
			</div>
			<div className="login-wrapper">
				<Login />
			</div>
		</div>
	);
}

export default LoginPanel;
