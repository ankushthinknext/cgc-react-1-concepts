import logo from "./logo.svg";
import "./App.css";
import Heading from "./components/Heading";
import Person from "./components/Person";
import Cities from "./components/Cities";

import Counter from "./components/Counter";
import Counters from "./components/Counters";
import FunCounter from "./components/FunCounter";
import FunCities from "./components/FunCities";
import Title from "./components/Title";
import Users from "./components/Users";
import UserForm from "./components/UserForm";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import User from "./components/User";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/LoginPanel";
import LoginPanel from "./screens/LoginPanel";
import React, { useState, useEffect } from "react";
import axios from "./components/utils/axiosConfig";

export const CartContext = React.createContext();
export const SettingsContext = React.createContext();

function App() {
	const [cartItems, setCartItems] = useState([]);
	const [allProducts, setAllProducts] = useState(null);
	const [storeSettings, setStoreSettings] = useState(null);
	const handleQtyChange = (id, type) => {
		let index = cartItems.findIndex((item) => item._id === id);
		if (index !== -1) {
			let newCartItems = [...cartItems];
			if (newCartItems[index]["qty"] === 1 && type === "decrement") return;
			type === "increment"
				? newCartItems[index]["qty"]++
				: newCartItems[index]["qty"]--;

			setCartItems(newCartItems);
		}
	};

	const handleCartDelete = (id) => {
		let index = cartItems.findIndex((item) => item._id === id);
		let newCartItems = [...cartItems];
		newCartItems.splice(index, 1);
		setCartItems(newCartItems);
	};
	const removeAllCartItems = () => {
		setCartItems([]);
	};

	const handleSelection = (id) => {
		let index = cartItems.findIndex((item) => item._id == id);
		if (index === -1) {
			let product = allProducts.find((product) => product._id === id);
			product.qty = 1;
			product.price = +product.price;
			setCartItems([...cartItems, product]);
		} else {
			let newCartItems = [...cartItems];
			newCartItems.splice(index, 1);
			setCartItems(newCartItems);
		}
	};
	useEffect(() => {
		axios("product?limit=100000").then((result) =>
			setAllProducts(result.data.data.products),
		);
		axios("setting").then((result) => setStoreSettings(result.data.data));
	}, []);

	return (
		<div>
			<CartContext.Provider
				value={{
					cartItems,
					handleQtyChange,
					handleSelection,
					handleCartDelete,
					removeAllCartItems,
				}}>
				<SettingsContext.Provider value={storeSettings}>
					<Switch>
						<Route path="/login" component={LoginPanel} />
						<Route
							path="/dashboard"
							render={(props) => {
								if (localStorage.getItem("token"))
									return <Dashboard {...props} />;
								return <Redirect to="/login" />;
							}}
						/>

						<Route path="/404" component={NotFound} />
						<Redirect from="/" to="/404" />
					</Switch>
				</SettingsContext.Provider>
			</CartContext.Provider>
		</div>
	);
}

export default App;
