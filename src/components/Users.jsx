import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { Chip, Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

function Users() {
	const classes = useStyles();
	const [users, setUsers] = useState(null);
	const [query, setQuery] = useState({
		limit: 100,
	});

	useEffect(() => {
		axios(
			`${process.env.REACT_APP_BACKEND_API}user?${queryString.stringify(
				query,
			)}`,
		).then((result) => setUsers(result.data.data.users));
	}, []);
	console.log(users);
	return (
		<div>
			<Container>
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
									{users &&
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

												<TableCell align="right"></TableCell>
											</TableRow>
										))}
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
