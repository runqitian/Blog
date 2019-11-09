import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {Link} from 'react-router-dom'

import './BlogCard.css'

class BlogCard extends React.Component{

	constructor(){
		super();
		this.state = {

		};
	}


	render(){

		return (
		    <Card className={"card"} style={{backgroundColor: "#fdfffd"}}>
		      <CardContent>
		        <Typography variant="h5" component="h2" style={{"marginLeft":"20px"}}>
					{this.props.title}
		        </Typography>
		        <br/>
		        <Typography variant="body2" component="p" style={{"marginLeft":"20px"}}>
					{this.props.title}
		        </Typography>
		      </CardContent>
		      <CardActions style={{"float":"right", "marginRight":"20px"}}>
		      	<Link to={'/article/' + this.props.index}>
		        <Button size="small">Learn More</Button>
		        </Link>
		      </CardActions>
		    </Card>
		 );

	}
}

export default BlogCard;