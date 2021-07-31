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
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function RecieptModal({ isOpen, transactionData }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(isOpen);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					{"Use Google's location service?"}
				</DialogTitle>
				<DialogContent>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">Product</TableCell>
								<TableCell align="center">Quantity</TableCell>
								<TableCell align="center">Price</TableCell>
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

										<TableCell align="right">
											{(item.price * item.qty).toFixed(2)}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Disagree
					</Button>
					<Button onClick={handleClose} color="primary" autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
