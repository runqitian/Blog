import React from "react"

import Grid from '@material-ui/core/Grid';
import BlogCard from "./BlogCard"

class Content extends React.Component{
	
	render(){
		return (
			<Grid
				container
				direction="row"
			  	justify="center"
			  	alignItems="flex-start"
			  	spacing={3}
			>
			<Grid item md={12} sm={12}> 
				<BlogCard/>
			</Grid>
			<Grid item md={12} sm={12}> 
				<BlogCard/>
			</Grid>
			</Grid>
		)
	}
}

export default Content;