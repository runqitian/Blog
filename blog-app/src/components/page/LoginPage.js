import React from 'react';

import {Route} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Header from "../header"
import SideBar from "../sidebar"
import Content from "../content"
import {Article, EditArticle} from "../article"
import { Input } from 'antd';
import { Button } from 'antd';
import { Alert } from 'antd';

import { AuthContext } from "../../context/Auth";

import $ from 'jquery';
import sha256 from 'sha256'

class LoginPage extends React.Component{

	static contextType = AuthContext;

	constructor(){
		super();
		this.state = {
			username : "",
			password : "",
			"hidden" : "hidden"
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e){
		e.preventDefault()
		const data = new FormData(e.target);
		data.set('username', document.getElementById("userInput").value)
		data.set('password', sha256(document.getElementById("pwdInput").value))
		fetch('/api/blog/login', {
	      method: 'POST',
	      body: data,
	    }).then(response => {
	    	if (response.status == 200){
	    		response.json().then(data => {
	    			localStorage.setItem('token', data['token']);
	    			window.location = "/admin"
	    		})
	    	}else{
	    		alert('login failed');
	    	}
	    })

	}

	render(){
		return (
			<Container maxWidth="md">
				<form ref="form" onSubmit={this.handleSubmit}>
					<h1 style={{"fontSize": "18px", "textAlign": "center", "lineHeight": "50px"}}>Login</h1>
					<Input placeholder="username" id="userInput" style={{"margin":"10px 10px"}}/>
					<Input.Password placeholder="password" id="pwdInput" style={{"margin":"10px 10px"}}/>
					<Button type="primary" htmlType="submit" block style={{"margin":"10px 10px"}}>login</Button>
				</form>
				<Alert id='alertMsg' style={{"visibility":"hidden"}} message="Error Text" type="error" />
			</Container>
		)
	}

}

export default LoginPage;