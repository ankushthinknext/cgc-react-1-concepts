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
import ImageIcon from "@material-ui/icons/Image";

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

export default function ProductForm(props) {
	const classes = useStyles();
	const [formData, setFormData] = useState({});
	const [method, setMethod] = useState("POST");
	const [categories, setCategories] = useState(null);
	const [image, setImage] = useState(null);

	const [errors, setErrors] = useState(null);
	useEffect(() => {
		let productId = props.match.params.id;

		productId &&
			axios(`${process.env.REACT_APP_BACKEND_API}product/${productId}`).then(
				(result) => {
					if (result.data.status === "success") {
						let {
							name,
							price,
							description,
							image: hidden,
							category,
						} = result.data.data;
						setFormData({
							...formData,
							name,
							price,
							description,
							hidden,
							category,
						});
						setMethod("PUT");
					}
				},
			);
	}, []);

	useEffect(() => {
		axios(`${process.env.REACT_APP_BACKEND_API}category`).then((result) => {
			if (result.data.status === "success")
				setCategories(result.data.data.categories);
		});
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const userFormSchema = {
		name:
			method === "PUT"
				? Joi.string().min(3).max(100)
				: Joi.string().required().min(3).max(100),
		price:
			method === "PUT"
				? Joi.string().max(10000000).min(0)
				: Joi.number().required().min(0).max(10000000000000),
		description:
			method === "PUT"
				? Joi.string().max(300)
				: Joi.string().required().max(300),
		hidden: Joi.string(),
		category: Joi.string().required(),
	};

	console.log(formData);
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
		let multiFormData = new FormData();
		for (let i in formData) {
			if (i === "price") {
				multiFormData.append(i, formData[i]);
			} else {
				multiFormData.append(i, formData[i]);
			}
		}
		image && multiFormData.append("image", image);
		axios({
			method: method,
			url: `${process.env.REACT_APP_BACKEND_API}${
				method === "PUT" ? "product/" + props.match.params.id : "product"
			}`,
			data: multiFormData,
			headers: {
				"Content-type": "multipart/formdata",
			},
		})
			.then((result) => {
				if (result.data.status === "success") {
					setErrors(null);
					Swal.fire(
						"Success",
						`Product ${
							method === "PUT" ? "updated" : "created"
						} successfully...`,
						"success",
					);
					props.history.goBack();
				} else {
					Swal.fire("Opps", "Something went wrong...", "error");
				}
			})
			.catch((err) => Swal.fire("Opps", "Something went wrong...", "error"));
	};
	const handleUpload = (e) => {
		var fileReader = new FileReader();
		fileReader.readAsDataURL(e.target.files[0]);
		fileReader.onload = function (oFREvent) {
			console.log(oFREvent.target.result);
			setImage(oFREvent.target.result);
		};
	};

	console.log(errors);
	console.log(formData);
	console.log(image);
	return (
		<Container component="main" maxWidth="lg">
			<Typography component="h1" variant="h5">
				<Button variant="defult" onClick={() => props.history.goBack()}>
					<ArrowBackIcon />
				</Button>{" "}
				New Product
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
									name="name"
									variant="outlined"
									required
									fullWidth
									placeholder="Product Name"
									InputLabelProps={{
										shrink: false,
									}}
									value={formData && formData.name}
								/>
								{errors &&
									errors.find((error) => error.context.key === "name") &&
									errors
										.filter((error) => error.context.key === "name")
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
									placeholder="Price"
									name="price"
									InputLabelProps={{
										shrink: false,
									}}
									value={formData && formData.price}
								/>
								{errors &&
									errors.find((error) => error.context.key === "price") &&
									errors
										.filter((error) => error.context.key === "price")
										.map((error) => (
											<p className="p-errors">{error.message}</p>
										))}
							</Grid>

							<Grid item sm={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									multiline
									rows={3}
									id="email"
									placeholder="Product description"
									name="description"
									InputLabelProps={{
										shrink: false,
									}}
									value={formData && formData.description}
								/>
								{errors &&
									errors.find((error) => error.context.key === "email") &&
									errors
										.filter((error) => error.context.key === "email")
										.map((error) => (
											<p className="p-errors">{error.message}</p>
										))}
							</Grid>

							<Grid item xs={12} sm={12}>
								<FormControl variant="outlined" fullWidth>
									<Select
										native
										fullWidth
										label="Age"
										inputProps={{
											name: "category",
											id: "outlined-age-native-simple",
										}}>
										<option aria-label="None" value="" />
										{categories &&
											categories.map((category) => (
												<option
													selected={formData.category === category._id}
													value={category._id}>
													{category.name}
												</option>
											))}
									</Select>
									{errors &&
										errors.find((error) => error.context.key === "category") &&
										errors
											.filter((error) => error.context.key === "category")
											.map((error) => (
												<p className="p-errors">{error.message}</p>
											))}
								</FormControl>
							</Grid>
						</Grid>
						<label className="my-2" htmlFor="icon-button-file">
							<Button
								className="c-btn"
								variant="contained"
								color="primary"
								component="span">
								<ImageIcon /> &nbsp; Upload
							</Button>
						</label>
						<input
							onChange={handleUpload}
							name="hidden"
							accept="image/*"
							className="d-none"
							id="icon-button-file"
							type="file"
						/>
						{(image || formData.hidden) && (
							<img
								style={{ width: "200px" }}
								src={image ? image : formData["hidden"]}
								alt=""
							/>
						)}
						<Grid container justifyContent="flex-end">
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
						</Grid>
					</form>
				</div>
			</Paper>
		</Container>
	);
}
