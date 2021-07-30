import React, { useContext } from "react";
import { CartContext } from "../App";

function Header() {
	const { cartItems } = useContext(CartContext);
	return (
		<div class="m-navbar">
			<ul className="nav-list">
				<li>cart items {cartItems.length}</li>
				<li>Account</li>
				<li>Logout</li>
			</ul>
		</div>
	);
}

export default Header;
