import React, { useState } from "react";
import Joi from "joi-browser";
import Swal from "sweetalert2";

export default function UserForm() {
	const [errors, setErrors] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		age: "",
	});
	const formSchema = {
		name: Joi.string().required().min(5).max(30),
		email: Joi.string()
			.email({ minDomainAtoms: 2, tlds: { allow: ["com", "net", "in"] } })
			.required()
			.min(7)
			.max(30),
		age: Joi.number().integer().required().min(10).max(100),
	};
	const handleFormChange = (e) => {
		let newFormData = { ...formData };
		newFormData[e.target.name] = e.target.value;
		setFormData(newFormData);
	};
	console.log(errors);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		let validationResults = Joi.validate(formData, formSchema);
		if (validationResults.error) setErrors(validationResults.error.details);
		if (!validationResults.error) createUser();
		async function createUser() {
			let result = await fetch(
				"https://60efff36f587af00179d3c01.mockapi.io/persons",
				{
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-type": "application/json",
					},
				},
			);
			if (result.status === 201) {
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: "User created successfully!",
					showConfirmButton: false,
					timer: 1500,
				});
				setErrors([]);
			}
		}
	};

	return (
		<div className="user-form border p-4 mt-5 rounded shadow-sm">
			<form onSubmit={handleFormSubmit} onChange={handleFormChange} action="">
				{errors.length !== 0 &&
					errors.map((error) => (
						<div class="alert alert-danger" role="alert">
							{error.message}
						</div>
					))}
				<div className="mb-3">
					<label for="exampleFormControlInput1" className="form-label">
						Name
					</label>
					<input
						name="name"
						type="text"
						className="form-control"
						id="exampleFormControlInput1"
						placeholder="Name"
					/>
				</div>
				<div className="mb-3">
					<label for="exampleFormControlInput1" className="form-label">
						Email
					</label>
					<input
						name="email"
						type="email"
						className="form-control"
						id="exampleFormControlInput1"
						placeholder=""
					/>
				</div>
				<div className="mb-3">
					<label for="exampleFormControlInput1" className="form-label">
						age
					</label>
					<input
						name="age"
						type="number"
						className="form-control"
						id="exampleFormControlInput1"
					/>
				</div>
				<button type="submit" className="btn btn-dark">
					Submit
				</button>
			</form>
		</div>
	);
}
