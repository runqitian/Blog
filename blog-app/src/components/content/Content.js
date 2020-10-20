import React from "react"

import Grid from '@material-ui/core/Grid';
import BlogCard from "./BlogCard"
import $ from 'jquery'
import { Button } from 'antd';
import "./Content.css"

class Content extends React.Component{
	

	constructor(){
		super();
		this.state = {
			category: "",
			limit: 0,
			more: true,
			blogs: []
		}
		this.loadMoreArticles = this.loadMoreArticles.bind(this);
	}

	componentDidMount(prevProps, prevState){
		var category = "";
		var limit = 6;
		if (this.props.match.path === '/' || this.props.match.path === '/admin'){
			category = "";
		}else{
			category = this.props.match.params.category;
		}
		$.ajax({
			url:'/api/blog/views',
			data:{
				tag: category,
				offset: 0,
				limit: limit
			},
			success: (data) => {
				this.setState({
					category: category,
					limit: data.length,
					more: true,
					blogs: data
				})
			}
		})
	}

	componentDidUpdate(prevProps, prevState){
		if (this.props.match.url === prevProps.match.url){
			return;
		}
		var category = ''
		if (this.props.match.path === '/' || this.props.match.path === '/admin'){
			category = ''
		}else{
			category = this.props.match.params.category
		}

		$.ajax({
			url:'/api/blog/views',
			data:{
				tag: category,
				offset: 0,
				limit: 6
			},
			success: (data) => {
				this.setState({
					category: category,
					limit: data.length,
					more: true,
					blogs: data
				})
			}
		})
	}

	loadMoreArticles(){
		$.ajax({
			url:'/api/blog/views',
			data:{
				tag: this.state.category,
				offset: this.state.limit,
				limit: 6
			},
			success: (data) => {
				if (data.length !== 6){
					this.setState({
						limit: this.state.limit + data.length,
						more: false,
						blogs: this.state.blogs.concat(data)
					})
				}else{
					this.setState({
						limit: this.state.limit + data.length,
						blogs: this.state.blogs.concat(data)
					})
				}
			}
		})
	}

	render(){
		var cards;

		if (this.props.admin){
			var new_button = 
				<Grid item md={12} sm={12} xs={12} align="center" key="new">
					<Button type="primary" style={{"display": "inline", "width":"80%"}} onClick={() =>{window.location='/admin/article/new'}}>
						添加
    				</Button>
    			</Grid>
			// console.log(this.state.blogs)
			cards = this.state.blogs.map((blog) => (
				<Grid item md={12} sm={12} xs={12} key={blog.id}>
					<BlogCard title={blog.title} summary={blog.summary} index={blog.id} admin/>
				</Grid>)
			)
			cards = cards.concat(new_button)
		}
		else{
			cards = this.state.blogs.map((blog) => (
				<Grid item md={12} sm={12} xs={12} key={blog.id}>
					<BlogCard title={blog.title} summary={blog.summary} index={blog.id}/>
				</Grid>)
			)
		}

		var loadmore;
		if (this.state.more){
			loadmore = 
			<div className="ReadMoreFontStyle" style={{"marginTop": "1em", "marginBottom": "2em", "fontSize":"min(5vw, 1.2em)"}}>
				<span onClick={this.loadMoreArticles}>Read More</span>
			</div>
		}else{
			loadmore = 
			<div className="EndFontStyle" style={{"marginTop": "1em", "marginBottom": "2em", "fontSize":"min(5vw, 1.2em)"}}>
				<span>Reach the end</span>
			</div>
		}

		return (
			<Grid
				container
				direction="row"
			  	justify="space-evenly"
			  	alignItems="flex-start"
			  	spacing={3}
			>
				{cards}
				{loadmore}
			</Grid>
		)
	}
}

export default Content;