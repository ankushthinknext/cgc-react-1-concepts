import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import {
	Button,
	Chip,
	Container,
	FormControl,
	Grid,
	Paper,
	InputLabel,
	Select,
	InputAdornment,
	OutlinedInput,
	LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

function Users(props) {
	const classes = useStyles();
	const [users, setUsers] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [query, setQuery] = useState({
		limit: 100,
	});

	useEffect(() => {
		axios(
			`${process.env.REACT_APP_BACKEND_API}user?${queryString.stringify(
				query,
			)}`,
		).then((result) => {
			if (result.data.status === "success") setUsers(result.data.data.users);
		});
	}, [refresh, query]);
	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Delete",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`${process.env.REACT_APP_BACKEND_API}user/${id}`)
					.then((response) => {
						Swal.fire("Deleted!", "User has been deleted..", "success");
						setRefresh(!refresh);
					})
					.catch((err) => {
						Swal.fire("Opps!", "Somthing went wrong..", "error");
					});
			}
		});
	};
	const handleQueryChange = (e) => {
		setUsers(null);
		setQuery({ ...query, [e.target.name]: e.target.value });
	};

	console.log(query);
	return (
		<div>
			<Container>
				<Grid container>
					<Link to={`${props.match.path}/new`}>
						<Button variant="contained" color="secondary">
							+ New User
						</Button>
					</Link>
				</Grid>
				<Grid container justifyContent="flex-end">
					<form onChange={handleQueryChange}>
						<FormControl variant="outlined">
							<OutlinedInput
								id="outlined-adornment-password"
								name="keyword"
								placeholder="Search users..."
								endAdornment={
									<InputAdornment position="end">
										<SearchIcon />
									</InputAdornment>
								}
								labelWidth={70}
							/>
						</FormControl>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
							<Select
								native
								value=""
								inputProps={{
									name: "role",
									id: "outlined-age-native-simple",
								}}>
								<option aria-label="None" value="" />
								<option value="all">All</option>
								<option value="Admin">Admin</option>
								<option value="Cashier">Cashier</option>
							</Select>
						</FormControl>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel htmlFor="outlined-age-native-simple">
								Sort By
							</InputLabel>
							<Select
								native
								value=""
								inputProps={{
									name: "sort",
									id: "outlined-age-native-simple",
								}}>
								<option aria-label="None" value="" />
								<option value="Newest">Newest</option>
								<option value="Oldest">Oldest</option>
								<option value="Name">Name</option>
								<option value="Last Active">Last Active</option>
							</Select>
						</FormControl>
					</form>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Paper>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Full Name</TableCell>
										<TableCell align="right">User Name</TableCell>
										<TableCell align="right">Role</TableCell>
										<TableCell align="right">Last Active</TableCell>
										<TableCell align="right">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{users ? (
										users.map((user) => (
											<TableRow key={user._id}>
												<TableCell component="th" scope="row">
													{user.fullname}
												</TableCell>
												<TableCell align="right">{user.username}</TableCell>
												<TableCell align="right">
													<Chip
														variant="outlined"
														color="secondary"
														label={user.role}
													/>
												</TableCell>
												<TableCell align="right">
													{moment(user.lastActive).format("llll")}
												</TableCell>

												<TableCell align="right">
													<Link to={`${props.match.path}/update/${user._id}`}>
														<EditIcon />
													</Link>
													<DeleteIcon onClick={() => handleDelete(user._id)} />
												</TableCell>
											</TableRow>
										))
									) : (
										<Grid
											container
											style={{ width: "100%" }}
											justifyContent="center">
											<LinearProgress
												style={{ height: "20px", width: "100%" }}
											/>
										</Grid>
									)}
								</TableBody>
							</Table>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Users;
