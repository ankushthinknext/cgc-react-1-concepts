import React from "react";

export default function Login() {
	return (
		<div>
			<form style={{ width: "100%" }} className="">
				<h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
				<label for="inputEmail" className="sr-only">
					Username
				</label>
				<input
					type="email"
					id="inputEmail"
					className="form-control"
					placeholder="Email address"
					required
					autofocus
				/>
				<label for="inputPassword" className="sr-only">
					Password
				</label>
				<input
					type="password"
					id="inputPassword"
					className="form-control"
					placeholder="Password"
					required
				/>

				<button className="btn btn-lg btn-primary btn-block" type="submit">
					Sign in
				</button>
			</form>
		</div>
	);
}
