import React from "react"
import { List} from 'antd'
import {Link} from 'react-router-dom'
import $ from 'jquery'


class SideBar extends React.Component{

	constructor(){
		super()
		this.state = {
			tags: []
		}
	}

	componentDidMount(){
		$.ajax({
			url:'/api/blog/tags',
			success: (data) => {
				this.setState({
					tags: data
				})
			}
		})
		// console.log('sidebar mounted')
	}

	// componentDidUpdate(prevProps, prevState, snapshot) {
	// 	console.log(this)
	// 	if (prevProps.match.url === this.props.match.url){
	// 		return;
	// 	}
	// 	$.ajax({
	// 		url:'http://localhost:5000/tags',
	// 		success: (data) => {
	// 			this.setState({
	// 				tags: data.content
	// 			})
	// 		}
	// 	})
	// }

	render(){
		var tag_url;
		if (this.props.admin){
			tag_url = '/admin/posts/'
		}
		else{
			tag_url = '/posts/'
		}
		return (
			<List
			    itemLayout="horizontal"
			    style={{"marginTop":"1.5em"}}
			    dataSource={this.state.tags}
			    renderItem={item => (
			      <List.Item style={{"height":"3.5em"}} align="center">
			        <List.Item.Meta
			          title={<Link to={tag_url + item.tag} ><span style={{'fontWeight':'500'}}>{item.tag}</span></Link>}
			        />
			      </List.Item>
			    )}
			/>
		)
	}
}

export default SideBar;