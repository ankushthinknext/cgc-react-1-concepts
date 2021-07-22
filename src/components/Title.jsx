import React, { useState, useEffect } from "react";

function Title() {
	const [name, setName] = useState("Mohit");
	const [title, setTitle] = useState("Hello");

	useEffect(() => {
		// statement that will excute eact time component is creted or rendered
		console.log("USE EFFECT CALLED...");
	}, [name, title]);

	const updateTitle = (e) => {
		setTitle(e.target.value);
	};
	const updateName = (e) => {
		setName(e.target.value);
	};

	return (
		<div>
			{console.log("RENDERED...")}
			<h1>Name = {name}</h1>
			<h1>Title = {title}</h1>
			<input onKeyUp={updateTitle} type="text" />
			<input onKeyUp={updateName} type="text" />
		</div>
	);
}

export default Title;
