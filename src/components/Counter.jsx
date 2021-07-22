import React, { Component } from "react";

export default class Counter extends Component {
	constructor() {
		super();
		console.log("Component constructor called");
	}
	state = {
		count: 0,
	};
	increment = () => {
		this.setState({ count: this.state.count + 1 });
	};
	decrement = () => {
		this.setState({ count: this.state.count - 1 });
	};
	componentWillMount() {
		console.log("Component is about to mount");
	}
	componentWillUpdate() {
		console.log("Component is about to update...");
	}
	componentDidUpdate() {
		console.log("Component updated....");
	}

	componentDidMount() {
		console.log("Component has mounted");
	}

	render() {
		console.log("Component Rendered");
		return (
			<div>
				<h1 className={this.state.count >= 0 ? "green" : "red"}>
					{this.state.count}
				</h1>
				<button
					onClick={this.increment}
					className="btn btn-success red-button increment-button">
					Increment
				</button>{" "}
				<button onClick={this.decrement} className="btn btn-dark">
					Decrement
				</button>
			</div>
		);
	}
}
