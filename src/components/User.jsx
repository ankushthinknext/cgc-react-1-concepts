import React, { useEffect, useState } from "react";
import queryString from "query-string";

function User(props) {
	let queryData = queryString.parse(props.location.search);
	console.log(queryData);
	const [person, setPerson] = useState({});
	const [keys, setKeys] = useState(false);

	useEffect(() => {
		fetch(
			`https://60efff36f587af00179d3c01.mockapi.io/persons/${props.match.params.id}`,
		)
			.then((result) => {
				if (result.status === 200) setKeys(true);

				return result.json();
			})
			.then((data) => setPerson(data));
	}, []);

	console.log(person);

	return (
		<div>
			<h1>Profile</h1>
			{!keys ? (
				<h1>UserNot found</h1>
			) : (
				<div className="card m-card m-auto">
					<img src={person.avatar} className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">{person.name}</h5>
						<h4>{person.email}</h4>
						<h4>{person.age}</h4>
						<a href="#" className="btn btn-primary">
							Go somewhere
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

export default User;
