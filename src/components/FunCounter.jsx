import React, { useState } from "react";

function FunCounter() {
	let [count, setCount] = useState(10);

	const increment = () => {
		setCount(count + 1);
	};
	const decrement = () => {
		setCount(count - 1);
	};

	return (
		<div>
			<h1>{count}</h1>
			<button onClick={increment} className="btn btn-success">
				Increment
			</button>
			<button onClick={decrement} className="btn btn-secondary">
				Decrement
			</button>
		</div>
	);
}

export default FunCounter;
