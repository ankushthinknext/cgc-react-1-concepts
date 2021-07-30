import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import { CartContext } from "../App";
const useStyles = makeStyles({
	table: {},
});

function Cart() {
	const classes = useStyles();

	const cartDetails = useContext(CartContext);
	console.log(cartDetails);
	return (
		<div>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell align="right">Product</TableCell>
						<TableCell align="right">Quantity</TableCell>

						<TableCell align="right">Total</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{cartDetails.cartItems.length &&
						cartDetails.cartItems.map((item) => (
							<TableRow key={item._id}>
								<TableCell>
									<DeleteIcon
										onClick={() => cartDetails.handleCartDelete(item._id)}
									/>
								</TableCell>
								<TableCell align="right">
									{item.name} {item.price}
								</TableCell>
								<TableCell align="right">
									<RemoveCircleOutlineIcon
										onClick={() =>
											cartDetails.handleQtyChange(item._id, "decrement")
										}
									/>
									{item.qty}{" "}
									<AddCircleOutlineIcon
										onClick={() =>
											cartDetails.handleQtyChange(item._id, "increment")
										}
									/>
								</TableCell>

								<TableCell align="right">{item.price * item.qty}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</div>
	);
}

export default Cart;
