import React from 'react';

import {Route, Switch} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Header from "../header"
import SideBar from "../sidebar"
import {Content, LiveContent} from "../content"
import {Article, EditArticle} from "../article"

class ArticleBody extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}

	render(){
		return(
			<Article index={this.props.match.params.id}/>
		)
	}
}

class EditArticleBody extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}
	
	render(){
		return(
			<EditArticle index={this.props.match.params.id}/>
		)
	}
}

class HomeBody extends React.Component{

	constructor(){
		super();
		this.state = {
			content: ''
		}
	}

	// componentDidUpdate(prevProps, prevState, snapshot) {
	// 	console.log('homebody updated')
	// }

	render(){
		return (
				<Grid
				  container
				  direction="row"
				  justify="center"
				  alignItems="flex-start"
				  spacing={3}
				>
				<Grid item md={3} sm={3} xs={12}>
					<div style={{"padding":"0.5em 0em 0.5em"}}>
						<SideBar/>
					</div>
		        </Grid>
		        <Grid item md={9} sm={9} xs={12}>
					<div style={{"padding":"10px 10px 10px"}}>
						<Switch>
							<Route exact path={['/posts/:category', '/']} component={Content} />
						</Switch>
					</div>
		        </Grid>
				</Grid>
		)
	}
}

class AdminBody extends React.Component{

	constructor(){
		super();
		this.state = {
			content: ''
		}
	}

	// componentDidUpdate(prevProps, prevState, snapshot) {
	// 	console.log('homebody updated')
	// }

	render(){
		return (
				<Grid
				  container
				  direction="row"
				  justify="center"
				  alignItems="flex-start"
				  spacing={3}
				>
				<Grid item md={3} sm={3} xs={12}>
					<div style={{"padding":"10px 10px 10px"}}>
						<SideBar admin/>
					</div>
		        </Grid>
		        <Grid item md={9} sm={9} xs={12}>
					<div style={{"padding":"10px 10px 10px"}}>
						<Route exact path={['/admin/posts/:category', '/admin']} render={(props) => <Content {...props} admin={true} />} />
					</div>
		        </Grid>
				</Grid>
		)
	}
}

class AdminPage extends React.Component{

	constructor(){
		super();
		this.state = {

		}
	}

	render(){
		return (
			<Container maxWidth="md">
				<Header admin />
				<div>
					<Route exact path="/admin/article/:id" component={EditArticleBody} />
					<Route exact path={['/admin/posts/:category', '/admin']} component={AdminBody} />
				</div>
			</Container>
		)

	}
}

class ResourcesBody extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}

	render(){
		return (
			<div></div>
		)
	}
}

class LiveBody extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}

	render(){
		return (
			<LiveContent/>
		)
	}
}

class Page extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}

	render(){
		console.log(this.props);
		return (
			<Container maxWidth="md">
				<Header/>
				<Switch>
					<Route exact path="/article/:id" component={ArticleBody} />
					<Route exact path={['/resources']} component={ResourcesBody} />
					<Route exact path={['/live']} component={LiveBody} />
					<Route exact path={['/posts/:category', '/']} component={HomeBody} />
				</Switch>
			</Container>
		)
	}

}

export {Page, HomeBody, ArticleBody, AdminPage};