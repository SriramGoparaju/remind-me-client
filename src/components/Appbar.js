import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
	AppBar,
	Button,
	makeStyles,
	Toolbar,
	Typography,
	IconButton,
	Menu,
	MenuItem,
} from "@material-ui/core";

import GroupIcon from "@material-ui/icons/Group";
import LibraryAddCheck from "@material-ui/icons/LibraryAddCheck";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
	appbar: {
		height: 90,
		display: "flex",
		justifyContent: "center",
		padding: "0 2rem",
	},
	text: {
		fontFamily: "Montez",
		fontWeight: "bold",
		flexGrow: 1,
	},
	icon: {
		margin: "0rem 0.4rem",
	},
	button: {
		margin: "0 1rem",
	},
}));

export default function Appbar() {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<AppBar className={classes.appbar} position="static" color="primary">
			<Toolbar>
				<Typography className={classes.text} variant="h4">
					Remind Me
				</Typography>
				{isMobile ? (
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<MenuIcon fontSize="large" />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>
								<Button
									className={classes.button}
									color="inherit"
									size="large"
									href="/"
								>
									<HomeIcon className={classes.icon} />
									Home
								</Button>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Button
									className={classes.button}
									color="inherit"
									size="large"
									href="/register"
								>
									<GroupIcon className={classes.icon} />
									Register
								</Button>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Button
									className={classes.button}
									color="inherit"
									size="large"
									href="/login"
								>
									<LibraryAddCheck className={classes.icon} />
									Login
								</Button>
							</MenuItem>
						</Menu>
					</div>
				) : (
					<>
						<div className={classes.buttons}>
							<Button
								className={classes.button}
								color="inherit"
								size="large"
								href="/"
							>
								<HomeIcon className={classes.icon} />
								Home
							</Button>
							<Button
								className={classes.button}
								color="inherit"
								size="large"
								href="/register"
							>
								<GroupIcon className={classes.icon} />
								Register
							</Button>
							<Button
								className={classes.button}
								color="inherit"
								size="large"
								href="/login"
							>
								<LibraryAddCheck className={classes.icon} />
								Login
							</Button>
						</div>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
}
