import React, { PureComponent } from "react";
import { Form, withFormik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import { CreateMatrixValidation } from "../../../utils/validation";
import Title from "./title";
import Variables from "./variables";
import Coworkers from "./coworkers";

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		margin: theme.spacing.unit * 2,
		padding: theme.spacing.unit * 2
	},
	button: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit
	}
});

class index extends PureComponent {
	render() {
		const { classes, handleSubmit, isSubmitting, closeWindow } = this.props;

		return (
			<div>
				<Form method="POST" onSubmit={handleSubmit}>
					<Paper className={classes.root} elevation={1}>
						<Title />
						<Divider />
						<Variables />
						<Divider />
						<Coworkers />

						<Button
							disabled={isSubmitting}
							variant="contained"
							color="secondary"
							className={classes.button}
							onClick={closeWindow}
						>
							Volver
						</Button>
						<Button
							type="submit"
							disabled={isSubmitting}
							variant="contained"
							color="primary"
							className={classes.button}
						>
							Crear matriz
						</Button>
					</Paper>
				</Form>
			</div>
		);
	}
}

export default withFormik({
	mapPropsToValues: () => ({
		title: ""
	}),
	validateOnBlur: false,
	validateOnChange: false,
	validationSchema: CreateMatrixValidation,
	handleSubmit: async (values, { setSubmitting }) => {
		console.log(values);
		setSubmitting(false);
	}
})(withStyles(styles)(index));
