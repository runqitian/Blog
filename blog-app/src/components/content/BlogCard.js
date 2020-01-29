import React from 'react';
import $ from 'jquery'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {Link} from 'react-router-dom'
import { Popconfirm, message} from 'antd';

import './BlogCard.css'

class BlogCard extends React.Component{

	constructor(){
		super();
		this.state = {

		};
	}

	handleDelete() {
		console.log(this.props.index)
		$.ajax({
			url:'http://localhost:5000/admin/blog/delete-article',
			data:{
				id: this.props.index
			},
			success: (data) => {
				console.log(data.success)
			}
		})
		window.location.reload();
		message.info('This is a normal message');
	}

	render(){
		var action_part;
		if (this.props.admin){
			action_part = (<div>
								<Link to={'/admin/article/' + this.props.index}>
						   			<Button size="small">Edit</Button>
						   		</Link>
						   		<Popconfirm
							        placement="topRight"
							        title="Are you sure to delete this blog?"
							        onConfirm={this.handleDelete.bind(this)}
							        okText="Yes"
							        cancelText="No"
							      >
							      	<Button size="small">Delete</Button>
							      </Popconfirm>
						   </div>
						)
		}
		else{
			action_part = (<Link to={'/article/' + this.props.index}>
						   <Button size="small">Learn more</Button>
						</Link>)
		}

		return (
		    <Card className={"card"} style={{"backgroundImage":"url(/cloudy-day.png)"}}>
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