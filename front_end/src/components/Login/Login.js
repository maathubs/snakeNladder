import React, { Component } from 'react';
import Textbox from '../Textbox';
import Button from '../Button/Button';
import classes from './Login.module.css';
import Errormsg from '../Errormsg/Errormsg';
import axios from '../../Axios';
import { Link } from "react-router-dom";
class Login extends Component {
    state = {
        emailErrormsg: " ",
        passwordErrormsg: ' ',
        buttonErrormsg: ' '
    }
    loginButton = () => {
        if (this.state.emailValue !== '' && this.state.passwordValue !== '') {
            axios.post('http://localhost:8000/api/login', {
                email: this.state.emailValue,
                password: this.state.passwordValue,
                name: this.state.nameValue
            })
                .then((response) => {
                    const obj = response.data;
                    console.log(response.data);
                    if (response.data.length !== 0) {
                        console.log("valid User");
                        // localStorage.setItem("userData", JSON.stringify(obj));
                        // console.log("localstorage.getItem....", JSON.parse(localStorage.getItem("userData")))
                        this.props.history.push({
                            pathname: '/Home',
                            query: {
                                userData: obj
                            }
                        })
                    }
                    else {
                        this.setState({
                            buttonErrormsg: "Invalid user"
                        });
                    }
                    // localStorage.setItem('player', JSON.stringify(response.data.user));
                }, err => {
                    this.setState({
                        passwordErrormsg: "Invalid password"
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
                .then(() => {
                });
        }
        else {
            this.setState({
                buttonErrormsg: "Fill the Fields"
            });
        }
    }
    validateEmail = (event) => {
        const email = event.target.value.trim();
        if (email === "") {
            this.setState({
                emailValue: email,
                emailErrormsg: "Enter the email"
            });
        }
        else {
            var allowed = /[a-z]/;
            var validMail = allowed.test(email);
            if (validMail === false) {
                this.setState({
                    emailValue: email,
                    emailErrormsg: "Invalid email"
                });
            }
            else {
                this.setState({
                    emailValue: email,
                    emailErrormsg: ""
                });
            }
        }
    }
    onKeyPress = (e) => {
        if (e.which === 13) {
            if (this.state.emailErrormsg === '' && this.state.passwordErrormsg === '') {
                this.loginButton();
            }
        }
    }
    validatePassword = (event) => {
        const password = event.target.value.trim();
        if (password === "") {
            this.setState({
                passwordErrormsg: "Enter the Password"
            });
        }
        else {
            var decimal = /[0-9]/;
            if (password.match(decimal)) {
                this.setState({
                    passwordValue: password,
                    passwordErrormsg: "",
                    buttonErrormsg: ""
                });
            }
            else {
                this.setState({
                    passwordErrormsg: "Invalid Password"

                });
            }
        }
    }

    render() {
        return (
            <div className={classes.Login}>
                <p id="Login">Login</p>
                <Textbox type="mail" className={classes.inputName} onkeyup={this.validateEmail} placeholder="Enter the Email id" />
                <Errormsg msg={this.state.emailErrormsg} />
                <Textbox type="password" className={classes.inputName} onkeyup={this.validatePassword} onKeyPress={this.onKeyPress} placeholder="Enter the password" />
                <Errormsg msg={this.state.passwordErrormsg} />
                <Button type="submit" className={classes.createAccount} onClick={this.loginButton} onSubmit={this.loginButton} value="Login" />
                <Errormsg msg={this.state.buttonErrormsg} />
                <Link className={classes.createLinkAccount} to="/Signup">Signup in seconds</Link>
            </div>
        );
    }

}
export default Login