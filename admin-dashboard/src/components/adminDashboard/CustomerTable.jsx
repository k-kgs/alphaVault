import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { deleteItem } from "../../redux/actions/userAction";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
};

const columns = [
	{
		field: "id",
		headerName: "Id",
		type: "string",
		width: 320,
	},
	{
		field: "email",
		headerName: "Email",
		description: "This column has a value getter and is not sortable.",
		sortable: false,
		width: 320,
		valueGetter: (params) => `${params.row.email || ""}`,
	},
	{
		field: "userType",
		headerName: "User Type",
		type: "string",
		width: 320,
	},
	{
		field: "action",
		headerName: "Action",
		type: "string",
		width: 160,
	},
];

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

export default function DataTable(props) {
	const user = useSelector((state) => state.users);
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [userId, setUserId] = React.useState();
	const [email, setEmail] = React.useState();
	const [userType, setUserType] = React.useState();
	const [password, setPassword] = React.useState();

  React.useEffect(() => {
    console.log(user, user.length)
  }, [user])

	const handleRowClick = (params) => {
		console.log("----clicked----", params);

		handleOpen();
		if (params.row) {
			setUserId(params.row.id);
			setEmail(params.row.email);
			setUserType(params.row.userType);
			setPassword(params.row.password);
		}
	};

	const handleUpdateClick = () => {
		console.log(email, userType, password);
	};

	const handleDeleteClick = () => {
		dispatch(deleteItem({ userId }))
	};

	const renderModalForm = () => {
		return (
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				<Box sx={style}>
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
									// borderRadius: "sm",
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
									sx={{ mt: 1 }}
									color="success"
									onClick={handleUpdateClick}
								>
									Update
								</Button>

								<Button
									sx={{ mt: 1 }}
									color="info"
									onClick={handleDeleteClick}
								>
									Delete
								</Button>
							</Sheet>
						</main>
					</CssVarsProvider>
				</Box>
				<Copyright sx={{ pt: 4 }} />
			</Container>
		);
	};

	return (
		<div style={{ height: 400, width: "100%" }}>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				{renderModalForm()}
			</Modal>
			<DataGrid
				rows={user}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				onRowClick={handleRowClick}
			/>
		</div>
	);
}
