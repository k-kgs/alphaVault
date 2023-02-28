import * as React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { addItem } from "../../redux/actions/userAction";

export default function Signup() {
	const [email, setEmail] = React.useState();
	const [userType, setUserType] = React.useState();
	const [password, setPassword] = React.useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = () => {
		if (email && password && userType) {
			dispatch(addItem({ email, userType, password }));
			navigate('/');
		}
	};

	return (
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
						<Typography level="body2">
							Sign up to continue.
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
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e, newValue) => setUserType(newValue)}
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
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>

					<Button
						sx={{ mt: 1 /* margin top */ }}
						onClick={handleClick}
					>
						Sign up
					</Button>
					<Typography
						endDecorator={<Link to="/">Sign in</Link>}
						fontSize="sm"
						sx={{ alignSelf: "center" }}
					>
						Don&apos;t have an account?
					</Typography>
				</Sheet>
			</main>
		</CssVarsProvider>
	);
}
