import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	redButton: {
		backgroundColor: "black",
	},
}));

export default function Login() {
	const classes = useStyles();
	return (
		<div>
			<Button variant="contained" color="secondary">
				Submit
			</Button>
			<Button variant="contained" className={classes.redButton}>
				Default
			</Button>
			<Button variant="contained" color="primary">
				Primary
			</Button>
		</div>
	);
}
