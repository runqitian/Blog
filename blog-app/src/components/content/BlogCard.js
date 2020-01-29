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
		var action_part;
		if (this.props.admin){
			action_part = (<Link to={'/admin/article/' + this.props.index}>
						   <Button size="small">Edit</Button>
						</Link>)
		}
		else{
			action_part = (<Link to={'/article/' + this.props.index}>
						   <Button size="small">Learn more</Button>
						</Link>)
		}

		return (
		    <Card className={"card"} style={{"backgroundImage":"url(/cloudy-day.png)", "background-attachment":"fixed"}}>
		      <CardContent>
		        <Typography variant="h5" component="h2" style={{"marginLeft":"20px"}}>
					{this.props.title}
		        </Typography>
		        <br/>
		        <Typography variant="body2" component="p" style={{"marginLeft":"20px"}}>
					{this.props.summary}
		        </Typography>
		      </CardContent>
		      <CardActions style={{"float":"right", "marginRight":"20px"}}>
		      	{action_part}
		      </CardActions>
		    </Card>
		 );

	}
}


export default BlogCard;