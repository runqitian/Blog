import React from 'react';

import {Route} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Header from "../header"
import SideBar from "../sidebar"
import Content from "../content"
import Article from "../article"

class ArticleBody extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}

	render(){
		return(
			<Article index={this.props.match.params.index}/>
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
					<div style={{"padding":"10px 10px 10px"}}>
						<SideBar/>
					</div>
		        </Grid>
		        <Grid item md={9} sm={9} xs={12}>
					<div style={{"padding":"10px 10px 10px"}}>
						<Route exact path={['/posts/:category', '/']} component={Content} />
					</div>
		        </Grid>
				</Grid>
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
		return (
			<Container maxWidth="md">
				<Header/>
				<div>
				{this.props.children}
				</div>
			</Container>
		)
	}

}

export {Page, HomeBody, ArticleBody};