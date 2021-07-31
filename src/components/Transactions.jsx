import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import {
	Container,
	Grid,
	Paper,
	Tabs,
	Tab,
	Box,
	Typography,
	Button,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Cart from "./Cart";

import { CartContext } from "../App";
import { useContext } from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RecieptModal from "./RecieptModal";
function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
}
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
	card: {
		width: "30%",
		margin: "10px 10px",
		position: "relative",
	},
}));

function Transactions() {
	const cartInfo = useContext(CartContext);

	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const [query, setQuery] = useState({
		limit: 100,
		page: 0,
	});
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [categories, setCategories] = useState(null);
	const [allProducts, setAllProducts] = useState(null);
	const [recieptModalOpen, setRecieptModalOpen] = useState(false);
	const [transactionData, setTransactionData] = useState(null);

	async function getAllCategoriesAndProducts() {
		let result = await axios(
			`${
				process.env.REACT_APP_BACKEND_API
			}product/transaction?${queryString.stringify(query)}`,
		);

		setCategories(result.data.data.categories);
		setAllProducts(result.data.data.all);
	}
	const handleTransactionData = (data) => {
		setTransactionData(data);
	};
	const handleRecieptModal = (value) => {
		setRecieptModalOpen(true);
	};

	useEffect(() => {
		getAllCategoriesAndProducts();
	}, []);
	console.log(transactionData, "TRANSACTION DATA");
	console.log(allProducts);
	return (
		<Container>
			<Grid container>
				<Grid item xs={12} sm={8}>
					<Paper>
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="auto"
							aria-label="scrollable auto tabs example">
							<Tab label="All" {...a11yProps(0)} />
							{categories &&
								categories.map((category, index) => (
									<Tab label={category.name} {...a11yProps(index + 1)} />
								))}
						</Tabs>
						<TabPanel value={value} index={0}>
							<div
								className="tabs-wrapper d-flex"
								style={{ justifyContent: "center", width: "100%" }}>
								{allProducts &&
									allProducts.map((product) => (
										<Card
											onClick={() => cartInfo.handleSelection(product._id)}
											className={classes.card}>
											<div
												className={`m-overlay ${
													cartInfo.cartItems.find((i) => i._id === product._id)
														? "active"
														: ""
												} `}>
												<CheckCircleOutlineIcon className="d-block" />
											</div>
											<CardActionArea>
												<CardMedia
													component="img"
													alt={product.description}
													height="200"
													image={product.image}
													title={product.name}
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="h2">
														{product.name}
													</Typography>
													<Typography
														variant="body2"
														color="textSecondary"
														component="p">
														{product.description}
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions ju>
												<Typography gutterBottom variant="h5" component="h2">
													$ &nbsp;{product.price}
												</Typography>
											</CardActions>
										</Card>
									))}
							</div>
						</TabPanel>

						{categories &&
							categories.map((category, index) => (
								<TabPanel value={value} index={index + 1}>
									<div
										className="tabs-wrapper d-flex"
										style={{ justifyContent: "center", width: "100%" }}>
										{category.items.map((product) => (
											<Card
												onClick={() => cartInfo.handleSelection(product._id)}
												className={classes.card}>
												<div
													className={`m-overlay ${
														cartInfo.cartItems.find(
															(i) => i._id === product._id,
														)
															? "active"
															: ""
													} `}>
													<CheckCircleOutlineIcon className="d-block" />
												</div>
												<CardActionArea>
													<CardMedia
														component="img"
														alt={product.description}
														height="200"
														image={product.image}
														title={product.name}
													/>
													<CardContent>
														<Typography
															gutterBottom
															variant="h5"
															component="h2">
															{product.name}
														</Typography>
														<Typography
															variant="body2"
															color="textSecondary"
															component="p">
															{product.description}
														</Typography>
													</CardContent>
												</CardActionArea>
												<CardActions ju>
													<Typography gutterBottom variant="h5" component="h2">
														$ &nbsp;{product.price}
													</Typography>
												</CardActions>
											</Card>
										))}
									</div>
								</TabPanel>
							))}
					</Paper>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Paper>
						<Cart
							onTransactionData={handleTransactionData}
							isModalOpen={handleRecieptModal}
						/>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Transactions;
