/* COPY OF LOGIN PAGE */

import React, { useState } from "react";
import { motion } from "framer-motion";
import "../LoginPage/LoginPage.css";
import {
	Button,
	CircularProgress,
	Grid,
	Select,
	TextField,
	Typography,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import Axios from "axios";

import MotionRedirect from "../../components/MotionRedirect/MotionRedirect";

function Signup() {
	const { register, handleSubmit, errors } = useForm();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const submitForm = async (data) => {
		setLoading(true);

		let { name, gender, email, password, phone } = data;
		let base = process.env.REACT_APP_BACKEND_URL;
		let url = `${base}/user/create?name=${name}&gender=${gender}&password=${password}&email=${email}&phone=${phone}`;

		console.log(url);

		try {
			await Axios.post(url).then((res) => {
				console.log(data);
				setLoading(false);
				setSuccess(true);
			});
		} catch (error) {
			console.log(error);
		}
	};

	if (success) {
		return <MotionRedirect to="/login" />;
	}

	return (
		<motion.div
			className="login-page"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ type: "tween" }}
			exit={{ opacity: 0, transition: { duration: 0.3 } }}
		>
			<Grid container spacing={0} style={{ height: "100%" }}>
				<Grid item xs={12} md={5} className="login-section">
					<form
						onSubmit={handleSubmit(submitForm)}
						className="login-form"
					>
						<Typography variant="h3" className="login-head">
							SIGN UP
						</Typography>
						<TextField
							variant="outlined"
							name="name"
							inputRef={register({ required: true })}
							placeholder="Name"
							style={{ width: "60%", marginBottom: "10px" }}
							InputProps={{
								style: {
									color: "black",
									fontWeight: "bold",
									backgroundColor: "white",
								},
							}}
							error={errors.name}
							helperText={errors.name ? "Name is required" : null}
						/>
						<Select
							native
							variant="outlined"
							name="gender"
							inputRef={register({ required: true })}
							style={{ width: "60%", marginBottom: "10px" }}
							error={errors.gender}
							className="gender-select"
						>
							<option aria-label="None" value="" disabled>
								Gender...
							</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</Select>
						<TextField
							variant="outlined"
							name="phone"
							inputRef={register({ required: true })}
							placeholder="Phone Number"
							style={{ width: "60%", marginBottom: "10px" }}
							InputProps={{
								style: {
									color: "black",
									fontWeight: "bold",
									backgroundColor: "white",
								},
							}}
							error={errors.phone}
							helperText={
								errors.phone ? "Phone Number is required" : null
							}
						/>
						<TextField
							variant="outlined"
							name="email"
							inputRef={register({ required: true })}
							placeholder="Email"
							style={{ width: "60%", marginBottom: "10px" }}
							InputProps={{
								style: {
									color: "black",
									fontWeight: "bold",
									backgroundColor: "white",
								},
							}}
							error={errors.email}
							helperText={
								errors.email ? "Email is required" : null
							}
						/>
						<TextField
							variant="outlined"
							name="password"
							type="password"
							inputRef={register({ required: true })}
							placeholder="Password"
							style={{ width: "60%", marginBottom: "7%" }}
							InputProps={{
								style: {
									color: "black",
									fontWeight: "bold",
									backgroundColor: "white",
								},
							}}
							error={errors.password}
							helperText={
								errors.password ? "Password is required" : null
							}
						/>
						{loading ? (
							<CircularProgress
								color="primary"
								style={{ width: "30px", height: "30px" }}
								thickness={7}
							/>
						) : (
							<Button
								variant="contained"
								color="primary"
								className="action-btn"
								type="submit"
								style={{ marginBottom: "20px" }}
							>
								SUBMIT
							</Button>
						)}
					</form>
				</Grid>
				<Grid item sm={12} md={7} className="login-text-section">
					<div className="jumbo-login-text">
						<Typography
							variant="h1"
							color="secondary"
							className="jumbo-text login-jumbo"
						>
							JOIN VIT'S ONLY DATING PLATFORM
						</Typography>
						<Typography
							variant="h6"
							className="login-secondary-text"
						>
							GET MATCHED WITH OTHER USERS BASED ON YOUR TIME
							TABLE!{" "}
							<ArrowBackIos
								style={{
									marginLeft: "20px",
								}}
							/>
						</Typography>
						<Typography
							variant="h6"
							className="login-secondary-text"
						>
							CHAT AND INTERACT WITH MATCHED USERS!
							<ArrowBackIos
								style={{
									marginLeft: "20px",
								}}
							/>
						</Typography>
					</div>
				</Grid>
			</Grid>
		</motion.div>
	);
}

export default Signup;
