import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function RecieptModal({
	isOpen,
	transactionData,
	onOpen,
	onClose,
}) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	return (
		<div>
			<Dialog
				open={isOpen}
				onClose={onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					<Typography
						align="center"
						className="text-muted"
						variant="h4"
						component="h5"
						gutterBottom>
						Receipt
					</Typography>
					<Typography
						align="center"
						className="text-muted"
						variant="caption"
						component="h5"
						gutterBottom>
						{transactionData &&
							moment(transactionData.createdAt).format("llll")}
					</Typography>
					<Typography
						align="center"
						className="text-muted"
						variant="caption"
						component="h5"
						gutterBottom>
						{transactionData && transactionData._id}
					</Typography>
				</DialogTitle>
				<DialogContent>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">Product</TableCell>
								<TableCell align="center">Quantity</TableCell>
								<TableCell align="center">Unit Price</TableCell>
								<TableCell align="right">Total</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{transactionData &&
								transactionData.products.length &&
								transactionData.products.map((item) => (
									<TableRow key={item._id}>
										<TableCell align="left">
											{item.name} {item.price}
										</TableCell>
										<TableCell align="right">{item.qty} </TableCell>
										<TableCell align="right">{item.price} </TableCell>

										<TableCell align="right">
											{(item.price * item.qty).toFixed(2)}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
					<Table>
						<TableRow>
							<TableCell align="right">Sub Total</TableCell>
							<TableCell align="right">
								{transactionData && transactionData.subtotal}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="right">Discount</TableCell>
							<TableCell align="right">
								{transactionData && transactionData.discount}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="right">
								<Typography variant="h5" component="h5">
									Grand Total
								</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography variant="h5" component="h5">
									{transactionData && transactionData.grandtotal}
								</Typography>
							</TableCell>
						</TableRow>
					</Table>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={onClose}
						variant="contained"
						fullWidth
						className="c-btn"
						color="primary">
						Print Receipt
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
