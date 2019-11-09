import React from 'react'

class Article extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}


	render(){
		return (
			<h1> this is from article component. {this.props.index}</h1>
		)
	}
}

export default Article;