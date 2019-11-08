import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Header from "../header"
import SideBar from "../sidebar"
import Content from "../content"

class Page extends React.Component{

	render(){
		return (
			<Container maxWidth="md">
			<Header/>
			<Grid
			  container
			  direction="row"
			  justify="center"
			  alignItems="flex-start"
			  spacing={3}
			>
			<Grid item md={3}>
				<div style={{"padding":"10px 10px 10px"}}>
					<SideBar/>
				</div>
	        </Grid>
	        <Grid item md={9}>
				<div style={{"padding":"10px 10px 10px"}}>
					<Content/>
				</div>
	        </Grid>
			</Grid>
			</Container>
			)
	}

}

export default Page;