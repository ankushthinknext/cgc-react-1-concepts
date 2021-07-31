import React, { useState, useEffect } from "react";
import queryString from "query-string";
import moment from "moment";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
	table: {
		width: "100%",
	},
});

const options = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
};

function DashboardPanel() {
	const classes = useStyles();
	const [weeklyTransactions, setWeeklyTransactions] = useState(null);
	const [dashboardData, setDashboardData] = useState(null);
	const [query, setQuery] = useState({
		start: moment().startOf("week").format("llll"),
		end: moment().endOf("week").format("llll"),
		limit: 5,
	});
	const [chartData, setChartData] = useState(null);
	const weeklyData = [];

	if (dashboardData && dashboardData.items) {
		for (let i = 1; i <= 7; i++) {
			let index = dashboardData.items.findIndex((item) => item._id == i);
			if (index !== -1)
				weeklyData.push(dashboardData.items[index]["grandtotal"]);
			else weeklyData.push(0);
		}
	}

	console.log(weeklyData);
	console.log(dashboardData && dashboardData.items);
	const ChartInfo = {
		labels: ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],
		datasets: [
			{
				label: "# of Votes",
				data: weeklyData,
				fill: false,
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgba(255, 99, 132, 0.2)",
			},
		],
	};

	useEffect(() => {
		axios(
			`${
				process.env.REACT_APP_BACKEND_API
			}transaction/dashboard?${queryString.stringify(query)}`,
		).then((result) => {
			setDashboardData(result.data.data);
		});
	}, []);
	useEffect(() => {
		axios(
			`${process.env.REACT_APP_BACKEND_API}transaction?${queryString.stringify(
				query,
			)}`,
		).then((result) => setWeeklyTransactions(result.data.data.transactions));
	}, []);
	console.log(weeklyTransactions);
	return (
		<div>
			<Container>
				<Grid container>
					<Grid item lg={4} md={6} xs={12}>
						<Paper className="d-sm-cards maroon-card">
							<h3>{dashboardData && dashboardData.count}</h3>
							<h5>Transactions</h5>
						</Paper>
					</Grid>
					<Grid item lg={4} md={6} xs={12}>
						<Paper className="d-sm-cards indigo-card">
							<h3>{dashboardData && dashboardData.total.toFixed(2)}</h3>
							<h5>Income</h5>
						</Paper>
					</Grid>
					<Grid item lg={4} md={6} xs={12}>
						<Paper className="d-sm-cards orange-card">
							<h3>{dashboardData && dashboardData.qty}</h3>
							<h5>Products</h5>
						</Paper>
					</Grid>
				</Grid>
				<Grid container direction="row`" alignItems="stretch">
					<Grid item lg={6} xs={12}>
						<Paper>
							<Line data={ChartInfo} options={options} />
						</Paper>
					</Grid>
					<Grid item lg={6}>
						<Paper>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Reciept No</TableCell>
										<TableCell align="right">Date</TableCell>
										<TableCell align="right">Quantity</TableCell>
										<TableCell align="right">Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{weeklyTransactions &&
										weeklyTransactions.map((transaction) => (
											<TableRow key={transaction._id}>
												<TableCell component="th" scope="row">
													{transaction._id}
												</TableCell>
												<TableCell align="right">
													{moment(transaction.createdAt).format("llll")}
												</TableCell>
												<TableCell align="right">
													{transaction.items.length}
												</TableCell>
												<TableCell align="right">
													{transaction.subtotal}
												</TableCell>
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

export default DashboardPanel;
