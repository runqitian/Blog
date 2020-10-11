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
			url:'/api/blog/article/' + this.props.index,
			type:"DELETE",
			headers: { 
			    "x-access-token" : localStorage.getItem("token")
			},
			success: (data) => {
				console.log(data)
				window.location.reload();
				message.info('删除成功');
			},
			error: (err) => {
				message.info('删除失败');

			}
		})
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
		        <Typography variant="h5" component="h2" style={{"marginLeft":"20px", "fontSize": "min(6vw, 1.5em)"}}>
					{this.props.title}
		        </Typography>
		        <br/>
		        <Typography variant="body2" component="p" style={{"marginLeft":"20px", "fontSize": "min(4vw, 1em)"}}>
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