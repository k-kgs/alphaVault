import * as React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

export default function Login(props) {
	const [email, setEmail] = React.useState();
	const [password, setPassword] = React.useState();
	const users = useSelector((state) => state.users);
	const navigate = useNavigate();

	const handleClick = () => {
		const user = users.filter(user => user.email === email && user.password === password);
		if (user) props.setCurrentUser(user);
		else alert('Please enter the correct username and password')
	}

	React.useEffect(() => {
		if (props.currentUser && props.currentUser.length > 0) {
			if (props.currentUser[0].userType === 'admin') navigate('/admin-panel');
			if (props.currentUser[0].userType === 'user')  navigate('/user-panel');
		} else {
			navigate('/');
		}
	}, [props.currentUser])

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
								Sign in to continue.
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
							<FormLabel>Password</FormLabel>
							<Input
								// html input attribute
								name="password"
								type="password"
								placeholder="password"
								required
								value={password}
								onChange={(e) => setPassword( e.target.value)}
							/>
						</FormControl>

						<Button sx={{ mt: 1 /* margin top */ }} onClick={handleClick}>Log in</Button>
						<Typography
							endDecorator={<Link to="/signup">Sign up</Link>}
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
