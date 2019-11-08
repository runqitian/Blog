import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './BlogCard.css'

class BlogCard extends React.Component{

	// constructor(index, title, summary){
	// 	super();
	// 	this.title = title;
	// 	this.summary = summary;
	// 	this.index = index;
	// 	this.state = {

	// 	};
	// }

	constructor(){
		super();
		this.title = "first blog test";
		this.summary = "summ";
		this.index = "ids";
		this.state = {

		};
	}


	render(){

		return (
		    <Card className={"card"} style={{backgroundColor: "#fdfffd"}}>
		      <CardContent>
		        <Typography variant="h5" component="h2" style={{"marginLeft":"20px"}}>
		          {this.title}
		        </Typography>
		        <br/>
		        <Typography variant="body2" component="p" style={{"marginLeft":"20px"}}>
		          this is the summary
		          <br />
		          {'"a benevolent smile"'}
		        </Typography>
		      </CardContent>
		      <CardActions style={{"float":"right", "marginRight":"20px"}}>
		        <Button size="small">Learn More</Button>
		      </CardActions>
		    </Card>
		 );

	}
}

export default BlogCard;