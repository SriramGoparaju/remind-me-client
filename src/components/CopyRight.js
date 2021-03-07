import React from "react";
import Typography from "@material-ui/core/Typography";

// This is the footer for all Pages
function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			{new Date().getFullYear()}
			{". All rights by Sriram Goparaju"}
		</Typography>
	);
}

export default Copyright;
