import React, { useContext } from "react";
import { CartContext } from "../App";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}))(Badge);

function Header() {
	const { cartItems } = useContext(CartContext);
	return (
		<div class="m-navbar">
			<ul className="nav-list">
				<li>cart items {cartItems.length}</li>
				<li>
					<IconButton aria-label="cart">
						<StyledBadge badgeContent={cartItems.length} color="secondary">
							<ShoppingCartIcon />
						</StyledBadge>
					</IconButton>
				</li>
				<li>Logout</li>
			</ul>
		</div>
	);
}

export default Header;
