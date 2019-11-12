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
			url:'http://localhost:5000/blog/tags',
			success: (data) => {
				this.setState({
					tags: data.content
				})
			}
		})
		console.log('sidebar mounted')
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
		return (
			<List
			    itemLayout="horizontal"
			    style={{"marginTop":"25px"}}
			    dataSource={this.state.tags}
			    renderItem={item => (
			      <List.Item style={{"height":"60px"}}>
			        <List.Item.Meta
			          title={<Link to={"/posts/"+item}><span>{item}</span></Link>}
			        />
			      </List.Item>
			    )}
			/>
		)
	}
}

export default SideBar;