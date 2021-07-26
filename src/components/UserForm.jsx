import React, { useState } from "react";
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
	const [errors, setErrors] = useState(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	console.log(formData);
	const userFormSchema = {
		fullname: Joi.string().required().min(8).max(50),
		username: Joi.string().required().min(8).max(30),
		email: Joi.string().email().required().min(8).max(30),
		password: Joi.string().required().min(8).max(30),
		role: Joi.string().required().min(8).max(30),
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

		//make post http request

		//
	};

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
									autoComplete="fname"
									name="fullname"
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="Full Name"
									autoFocus
								/>
								{errors &&
									errors.find((error) => error.context.key === "fullname") &&
									errors
										.filter((error) => error.context.key === "fullname")
										.map((error) => (
											<p className="p-errors">{error.message}</p>
										))}
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="User Name"
									name="username"
									autoComplete="lname"
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
									label="Email Address"
									name="email"
									autoComplete="email"
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
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
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
										<option value="admin">Admin</option>
										<option value="cashier">Cashier</option>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Button
							type="submit"
							variant="contained"
							size="large"
							color="secondary"
							className="c-btn mt-5">
							Submit
						</Button>
					</form>
				</div>
			</Paper>
		</Container>
	);
}
