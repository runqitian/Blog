import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Page, AdminPage, LoginPage} from './components/page'
import LoadingIcon from "./components/loading"


import axios from 'axios';

const TokenRequired = () => {

	const [status, setStatus] = useState({
		auth: false,
		waiting: true
	});

	useEffect(() => {
		console.log(status.waiting)
		console.log("auth is " + status.auth)
		console.log("middle mounted")
	})

	const tokenCheck = async () => {
		const token = localStorage.getItem("token")
		if (!token){
			setStatus({
				auth: false,
				waiting: false
			})
		}
		await axios.get("/api/blog/authstate",
			{
				headers: {'x-access-token': token}
			}	
		).then(res => {
			if (res.status === 200){
				setStatus({
					auth: true,
					waiting: false
				})
			}
		}).catch(error => {
			setStatus({
				auth: false,
				waiting: false
			})		})
	}

	if (status.waiting){
		tokenCheck()
		return <LoadingIcon/>
	}else{
		if (status.auth === false){
			var currLoc = window.location.pathname;
			return <Redirect to={{
			    pathname: "/login",
				state: { prev: currLoc }
			}} />
		}else{
			return (
				<Switch>
					<Route exact path={['/admin/resources', '/admin/article/*', '/admin/posts/*','/admin']} component={AdminPage} />
					<Route exact path={['/live']} component={Page} />
				</Switch>
			)
		}
	}
}

class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			auth : false
		}

	}
	
	render(){
		// <PrivateRoute exact path={['/admin/resources', '/admin/article/*', '/admin/posts/*','/admin']} component={AdminPage} />
		return (
			<div style={{"backgroundImage":"url(/blue-snow.png)", "backgroundRepeat": "repeat", "height":"100%", overflowX: "scroll"}}>
				<Router>
					<Switch>
						<Route exact path={['/admin/resources', '/admin/article/*', '/admin/posts/*','/admin']} component={TokenRequired} />
						<Route exact path={['/resources', '/article/*', '/posts/*', '/']} component={Page} />
						<Route exact path={['/live']} component={TokenRequired} />
						<Route exact path={['/login']} component={LoginPage} />
					</Switch>
				</Router>
			</div>
		)


	}
}

export default App

//
//
// {/*<Router>*/}
// {/*	<Link to={'/123'}>test1</Link>*/}
// {/*	<Link to={'/456'}>test2</Link>*/}
// {/*	<a href={"/987"}>test3</a>*/}
// {/*	<Route path={"/:id"} component={Home1}></Route>*/}
// {/*</Router>*/}



