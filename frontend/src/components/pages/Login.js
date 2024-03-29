import React from 'react';
import { useHistory } from 'react-router-dom';
import './css/login.css';
import { useState, useContext } from 'react';
import Axios from 'axios';
import { AuthContext } from '../../lib/auth/auth.context';
import { NavLink } from '../../components/Navbar/NavbarElements';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../../Small-Components/Input'

const Login = () => {
	toast.configure();

	const setAuthContext = useContext(AuthContext);

	const [userEmail, setuserEmail] = useState('');
	const [userPassword, setuserPassword] = useState('');

	const history = useHistory();

	const login = (e, setAuth) => {
		e.preventDefault();
		if(userEmail === '' || userPassword === '') {
			const toastWarning = () => {
				toast.info('All fields are required 🤔', {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 3000
				})
			}
		       return(
				   toastWarning()
				   )
			
		}
		var EmailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
		if(userEmail.length && !userEmail.match(EmailRegex)){
			const toastEmail = () => {
				toast.dark('Invalid email address: '+ userEmail +'     🥱' , {
					position: toast.POSITION.BOTTOM_CENTER,
					autoClose: 3000
				})
			}
			return  toastEmail()
		}
		else{
				
		Axios.post(`${process.env.REACT_APP_API_USER}/login`, {
			email: userEmail,
			pass: userPassword,
		})
			.then((response) => {
				if(!response.data){
					const toastWarning = () => {
						toast.warning('Something is wrong', {
							position: toast.POSITION.TOP_CENTER,
							autoClose: 3000
						})
					}
					toastWarning()
				}
				if (response.data.token) {
					console.log(response)
					const name = (response.data.userDB[0].first_name).toUpperCase()
					const toastFx = () => {
						toast.success('Hello ' + name + ' is good to see ya..!');
						// ${response.data.userDB[0].first_name}
					};
					localStorage.setItem('jwt', JSON.stringify(response.data.token));
					setAuth(response.data.token);
					toastFx();

					history.push('/EachUser');
					// console.log(userEmail);
				}
			})
			.catch((error) => {
				
				// console.log('Este es el error : ', error.response.data);
				const info1 = <p className="bg-danger text-light text-center">Im so sorry but we have server problems...☹</p>
				if(error.response === undefined){
					const toastError1 = () => {
					toast.dark(info1)
				}
					return toastError1()
					}
				
				if(!error.response){
					const info2 = <p className="bg-danger text-light text-center">Seems like something went wrong. Please try again</p>
					const toastError = () => {
							toast.error(info2)
							}
					return toastError()
					 };
					if(!error.response.data){
						
					return null
					}else{
						const R = () => {
							toast.error( error.response.data.message)
						}
						R();
					}
			// window.location.reload()	
			}) 		
		}

	};

	return (
		<>
			<div className="login_page">
				<div className="login">
					<h1>Login Page</h1>
					<div className="email">
						<label>Username</label>
						<input
							type="email"
							id="email"
							placeholder="Email address"
							onChange={(e) => {
								setuserEmail(e.target.value);
							}}
							autoFocus
						/>
					</div>
					<div className="password">
						<label>Password</label>
						<input
							type="text"
							id="password"
							placeholder="Password"
							onChange={(e) => {
								setuserPassword(e.target.value);
							}}
							autoComplete="off"
						/>
					</div>

					<button
						className="btn_login"
						onClick={(e) => {
							login(e, setAuthContext.setAuth);
						}}
					>
						Login
					</button>
					<div className="line_top"></div>

					<div className="social_media">
					
						<h6 className="social_text">Register with social</h6>
						<div className="movil">
							<div className="google">
							<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" className="bi bi-google" viewBox="0 0 16 16">
							<path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
							</svg>
						</div>
						<div className="github">   
							<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" className="bi bi-github" viewBox="0 0 16 16">
							<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
							</svg>
						</div>
						<div className="facebook">
						</div>
						
							<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"  className="bi bi-facebook" viewBox="0 0 16 16">
								<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
								</svg>
						</div>

					</div>
					<div className="line_bottom"></div>
					<div className="register_side">
						<h3>If you don't have an account...</h3>

						<NavLink to="/userRegister">
							<span className="login_span">
								Register here
							</span>
							</NavLink>
					</div>
				</div>
			</div>
			
		</>
	);
};

export default Login;
