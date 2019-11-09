import React from "react"

import Grid from '@material-ui/core/Grid';
import BlogCard from "./BlogCard"
import $ from 'jquery'

class Content extends React.Component{
	

	constructor(){
		super();
		this.state = {
			blogs: []
		}
	}

	componentDidMount(prevProps, prevState){
		var category = ''
		if (this.props.match.path === '/'){
			category = ''
		}else{
			category = this.props.match.params.category
		}
		$.ajax({
			url:'http://localhost:5000/blogs',
			data:{
				category: category
			},
			success: (data) => {
				this.setState({
					blogs:data.content
				})
			}
		})
	}

	componentDidUpdate(prevProps, prevState){
		if (this.props.match.url === prevProps.match.url){
			return;
		}
		var category = ''
		if (this.props.match.path === '/'){
			category = ''
		}else{
			category = this.props.match.params.category
		}

		$.ajax({
			url:'http://localhost:5000/blogs',
			data:{
				category: category
			},
			success: (data) => {
				this.setState({
					blogs:data.content
				})
			}
		})
	}

	render(){
		var cards = this.state.blogs.map((blog) => (
			<Grid item md={12} sm={12} xs={12} key={blog.id}>
				<BlogCard title={blog.title} summary={blog.summary} index={blog.id}/>
			</Grid>)
		)
		return (
			<Grid
				container
				direction="row"
			  	justify="space-evenly"
			  	alignItems="flex-start"
			  	spacing={3}
			>
				{cards}
			</Grid>
		)
	}
}

export default Content;