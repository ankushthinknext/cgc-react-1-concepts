import React, { useContext } from "react";
import { CartContext } from "../App";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Avatar, List, ListItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2),
	},
}));

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}))(Badge);

function Header() {
	const classes = useStyles();
	const { cartItems } = useContext(CartContext);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
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
				<li>
					<Avatar onClick={handleClick}>ZE</Avatar>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "center",
						}}>
						<List>
							<ListItem>Settings</ListItem>
							<ListItem>Account</ListItem>
							<ListItem>Logout</ListItem>
						</List>
					</Popover>
				</li>
			</ul>
		</div>
	);
}

export default Header;
