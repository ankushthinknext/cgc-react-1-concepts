import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormControl, InputLabel, Paper, Select } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Joi from "joi-browser";
import axios from "axios";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
		padding: "20px",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function UserFrom(props) {
	const classes = useStyles();
	const [formData, setFormData] = useState({});
	const [method, setMethod] = useState("POST");

	const [errors, setErrors] = useState(null);
	useEffect(() => {
		let userId = props.match.params.id;
		userId &&
			axios(`${process.env.REACT_APP_BACKEND_API}user/${userId}`).then(
				(result) => {
					if (result.data.status === "success") {
						setFormData(result.data.data);
						setMethod("PUT");
					}
				},
			);
	}, []);
	console.log(formData);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const userFormSchema = {
		fullname: Joi.string().required().min(8).max(50),
		username: Joi.string().required().min(8).max(30),
		email: Joi.string().email().required().min(8).max(30),
		password: Joi.string().required().min(8).max(30),
		role: Joi.string().required(),
	};

	console.log(errors);
	const handleSubmit = (e) => {
		e.preventDefault();
		//validate form data

		let validation = Joi.validate(formData, userFormSchema, {
			abortEarly: false,
		});
		if (validation.error) {
			setErrors(validation.error.details);
			return;
		}
		axios({
			method: method,
			url: `${process.env.REACT_APP_BACKEND_API}${
				method === "PUT" ? "user/" + props.match.params.id : "user"
			}`,
			data: formData,
		})
			.then((result) => {
				if (result.data.status === "success") {
					setErrors(null);
					Swal.fire("Success", "User created successfully...", "success");
					props.history.goBack();
				} else {
					Swal.fire("Opps", "Something went wrong...", "error");
				}
			})
			.catch((err) => Swal.fire("Opps", "Something went wrong...", "error"));
	};
	console.log(errors);
	console.log(formData);
	return (
		<Container component="main" maxWidth="lg">
			<Typography component="h1" variant="h5">
				<Button variant="defult" onClick={() => props.history.goBack()}>
					<ArrowBackIcon />
				</Button>{" "}
				New User
			</Typography>

			<Paper>
				<div className={classes.paper}>
					<form
						onSubmit={handleSubmit}
						onChange={handleChange}
						className={classes.form}
						noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									name="fullname"
									variant="outlined"
									required
									fullWidth
									id="firstName"
									placeholder="Full Name"
									name="fullname"
									InputLabelProps={{
										shrink: false,
									}}
									value={formData && formData.fullname}
								/>
								{errors &&
									errors.find((error) => error.context.key === "fullname") &&
									errors
										.filter((error) => error.context.key === "fullname")
										.map((error) => (
											<p className="p-errors ">{error.message}</p>
										))}
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									placeholder="Username"
									name="username"
									InputLabelProps={{
										shrink: false,
									}}
									name="username"
									autoComplete="lname"
									value={formData && formData.username}
								/>
								{errors &&
									errors.find((error) => error.context.key === "username") &&
									errors
										.filter((error) => error.context.key === "username")
										.map((error) => (
											<p className="p-errors">{error.message}</p>
										))}
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									placeholder="Email Address"
									name="email"
									InputLabelProps={{
										shrink: false,
									}}
									autoComplete="email"
									value={formData && formData.email}
								/>
								{errors &&
									errors.find((error) => error.context.key === "email") &&
									errors
										.filter((error) => error.context.key === "email")
										.map((error) => (
											<p className="p-errors">{error.message}</p>
										))}
							</Grid>
							<Grid item xs={12} sm={6}>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="password"
										type="password"
										placeholder="Password"
										InputLabelProps={{
											shrink: false,
										}}
									/>
									{errors &&
										errors.find((error) => error.context.key === "password") &&
										errors
											.filter((error) => error.context.key === "password")
											.map((error) => (
												<p className="p-errors">{error.message}</p>
											))}
								</Grid>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl variant="outlined" fullWidth>
									<Select
										native
										fullWidth
										label="Age"
										inputProps={{
											name: "role",
											id: "outlined-age-native-simple",
										}}>
										<option aria-label="None" value="" />
										<option
											selected={`${formData.role === "admin"}`}
											value="admin">
											Admin
										</option>
										<option
											selected={`${formData.role === "cashier"}`}
											value="cashier">
											Cashier
										</option>
									</Select>
									{errors &&
										errors.find((error) => error.context.key === "role") &&
										errors
											.filter((error) => error.context.key === "role")
											.map((error) => (
												<p className="p-errors">{error.message}</p>
											))}
								</FormControl>
							</Grid>
						</Grid>
						{method === "POST" ? (
							<Button
								type="submit"
								variant="contained"
								size="large"
								color="secondary"
								className="c-btn mt-5">
								Create
							</Button>
						) : (
							<Button
								type="submit"
								variant="contained"
								size="large"
								color="secondary"
								className="c-btn mt-5">
								Update
							</Button>
						)}
					</form>
				</div>
			</Paper>
		</Container>
	);
}
