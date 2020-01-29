import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Page, HomeBody, ArticleBody, AdminPage} from './components/page'


// class Home1 extends React.Component{
//
// 	constructor(){
// 		super();
// 		this.state = {
// 			id : ''
// 		}
// 	}
//
// 	componentWillMount() {
// 		this.state.id = 'mount ' + this.props.match.params.id;
// 	}
//
// 	componentWillUpdate() {
// 		console.log('after update')
// 		this.state.id = 'update ' + this.props.match.params.id
// 	}
//
// 	render(){
// 		return (
// 			<div>
// 				<h1 dangerouslySetInnerHTML={{__html:'hello, Home1 ' + this.state.id}}></h1>
// 			</div>
// 		)
// 	}
// }
//
// class Home2 extends React.Component{
// 	render(){
// 		return (
// 			<div>
// 				<h1> hello, Home2! </h1>
// 			</div>
// 		)
// 	}
// }

class App extends React.Component{

	render(){
		return (
			<div style={{"backgroundImage":"url(/blue-snow.png)", "backgroundRepeat": "repeat", "height":"100%", overflowX: "scroll"}}>
				<Router>
					<Route exact path={['/admin/resources', '/admin/article/*', '/admin/posts/*','/admin']} component={AdminPage} />
					<Route exact path={['/resources', '/article/*', '/posts/*', '/']} component={Page} />
					{/*
					<Page>
						<Route exact path="/article/:id" component={ArticleBody} />
						<Route exact path={['/posts/:category', '/']} component={HomeBody} />
					</Page>
					*/}
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



