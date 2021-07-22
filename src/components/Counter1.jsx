import React, { Component } from "react";

export default function Counter1(props) {
	return (
		<div>
			<h1>{props.count}</h1>
			<button
				onClick={() => props.onIncrement(props.id)}
				className="btn btn-success ">
				Increment
			</button>
			<button
				onClick={() => props.onDecrement(props.id)}
				className="btn btn-dark ms-5">
				Decrement
			</button>
		</div>
	);
}

//stateless function component
