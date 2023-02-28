import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { mainListItems } from "../dashboardComponents/listItems";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

const mdTheme = createTheme();

function DashboardContent(props) {
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();

	const [email, setEmail] = React.useState();
	const [userType, setUserType] = React.useState();
	const [password, setPassword] = React.useState();

	React.useEffect(() => {
		if (props.currentUser.length > 0) {
			setEmail(props.currentUser[0].email);
			setUserType(props.currentUser[0].userType);
			setPassword(props.currentUser[0].password);
		}
	}, [props.currentUser]);

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const handleUpdateClick = () => {
		console.log(email, userType, password);
	};

	const handleDeleteClick = () => {};

	const handleLogoutClick = () => {
		props.setCurrentUser(null);
		navigate("/");
	};

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar position="absolute" open={open}>
					<Toolbar
						sx={{
							pr: "24px", // keep right padding when drawer closed
						}}
					>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: "36px",
								...(open && { display: "none" }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							sx={{ flexGrow: 1 }}
						>
							User Dashboard
						</Typography>
						<IconButton color="inherit">
							<LogoutIcon onClick={handleLogoutClick} />
						</IconButton>
						<IconButton color="inherit">
							<Badge badgeContent={4} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={open}>
					<Toolbar
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							px: [1],
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">{mainListItems}</List>
				</Drawer>
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === "light"
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: "100vh",
						overflow: "auto",
					}}
				>
					<Toolbar />
					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<CssVarsProvider>
							<main>
								<Sheet
									sx={{
										width: 300,
										mx: "auto", // margin left & right
										my: 4, // margin top & botom
										py: 3, // padding top & bottom
										px: 2, // padding left & right
										display: "flex",
										flexDirection: "column",
										gap: 2,
										borderRadius: "sm",
										boxShadow: "md",
									}}
									variant="outlined"
								>
									<div>
										<Typography level="h4" component="h1">
											<b>Welcome!</b>
										</Typography>
									</div>
									<FormControl>
										<FormLabel>Email</FormLabel>
										<Input
											// html input attribute
											name="email"
											type="email"
											placeholder="johndoe@email.com"
											required
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
										/>
									</FormControl>
									<FormControl>
										<FormLabel>User Type</FormLabel>
										<Select
											color="neutral"
											placeholder="Choose one…"
											size="sm"
											required
											value={userType}
											onChange={(e, newValue) =>
												setUserType(newValue)
											}
										>
											<Option value="admin">Admin</Option>
											<Option value="user">User</Option>
										</Select>
									</FormControl>
									<FormControl>
										<FormLabel>Password</FormLabel>
										<Input
											// html input attribute
											name="password"
											type="password"
											placeholder="password"
											required
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
										/>
									</FormControl>

									<Button
										sx={{ mt: 1 /* margin top */ }}
										color="success"
										onClick={handleUpdateClick}
									>
										Update
									</Button>
									<Button
										sx={{ mt: 1 /* margin top */ }}
										color="info"
										onClick={handleDeleteClick}
									>
										Delete
									</Button>
								</Sheet>
							</main>
						</CssVarsProvider>
						<Copyright sx={{ pt: 4 }} />
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default function UserDashboard(props) {
	return (
		<DashboardContent
			currentUser={props.currentUser}
			setCurrentUser={props.setCurrentUser}
		/>
	);
}
