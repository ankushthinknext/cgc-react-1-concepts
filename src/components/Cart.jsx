import React, { useContext, useState } from "react";
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
import { Button } from "@material-ui/core";
import axios from "./utils/axiosConfig";

import { CartContext, SettingsContext } from "../App";
import RecieptModal from "./RecieptModal";
const useStyles = makeStyles({
	table: {},
});

function Cart(props) {
	const classes = useStyles();
	const [modalOpen, setModalOpen] = useState(false);
	const storeSettings = useContext(SettingsContext);
	const cartDetails = useContext(CartContext);
	const subTotal = cartDetails.cartItems.length
		? cartDetails.cartItems.reduce(
				(sum, item) => sum + item.price * item.qty,
				0,
		  )
		: 0;
	const discount = storeSettings
		? (+storeSettings.discount / 100) * subTotal
		: 0;
	const { cartItems } = cartDetails;
	const tax = storeSettings ? (+storeSettings.tax / 100) * subTotal : 0;
	const grandTotal = storeSettings ? subTotal + tax - discount : 0;
	const [transactionData, setTransactionData] = useState(null);
	const handleSubmit = async () => {
		let result =
			cartItems.length !== 0
				? await axios.post("transaction", {
						items: cartItems,
						discount,
						grandtotal: grandTotal,
						subtotal: subTotal,
				  })
				: false;
		if (result && result.data.status === "success") {
			cartDetails.removeAllCartItems();
			setTransactionData(result.data.data);
			setModalOpen(true);
		}
	};

	const handleClickOpen = () => {
		setModalOpen(true);
	};

	const handleClose = () => {
		setModalOpen(false);
	};

	return (
		<div>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="left">Product</TableCell>
						<TableCell align="center">Quantity</TableCell>

						<TableCell align="right">Total</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{cartDetails.cartItems.length &&
						cartDetails.cartItems.map((item) => (
							<TableRow key={item._id}>
								<TableCell align="left">
									<DeleteIcon
										onClick={() => cartDetails.handleCartDelete(item._id)}
									/>
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

								<TableCell align="right">
									{(item.price * item.qty).toFixed(2)}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell align="left">SubTotal</TableCell>
						<TableCell align="right">{subTotal.toFixed(2)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align="left">Discount</TableCell>
						<TableCell align="right">{discount.toFixed(2)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align="left">Tax</TableCell>
						<TableCell align="right">{tax.toFixed(2)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align="left">Grand Total</TableCell>
						<TableCell align="right">{grandTotal.toFixed(2)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align="left">
							<Button variant="contained" color="dark" size="large">
								Cancel
							</Button>
						</TableCell>
						<TableCell align="right">
							<Button
								variant="contained"
								onClick={handleSubmit}
								className="c-btn"
								disabled={cartItems.length === 0}
								size="large">
								Pay
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<RecieptModal
				isOpen={modalOpen}
				onOpen={handleClickOpen}
				onClose={handleClose}
				transactionData={transactionData}
			/>
		</div>
	);
}

export default Cart;
