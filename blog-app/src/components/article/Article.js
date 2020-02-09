import React from 'react'
import ReactMarkdown from "react-markdown";
import $ from 'jquery'
import { Tag } from 'antd';
import { Typography } from 'antd';

class Article extends React.Component{
	constructor(){
		super();
		this.state = {
			title:'',
			tags:[],
			content:''
		}
	}

	componentDidMount() {
		$.ajax({
			url:'/api/blog/article/' + this.props.index,
			success:(data) => {
				const result = data
				this.setState({
					title:result.title,
					tags:result.tags,
					content:result.content
				})
			}
		})
	}

	render(){
		const { Title } = Typography;
		var tags = this.state.tags.map((tag) => {
			var randomColor = Math.floor(Math.random()*16777215).toString(16);
			console.log(tag)
			return (<Tag color={"#" + randomColor} style={{'float': 'right'}} key={tag}>{tag}</Tag>)
		})
		return (
			<div style={{'padding':'20px 50px 20px', 'objectFit':'cover', 'position':'relative'}}>
				<div>
					<Title style={{'paddingBottom':'20px', 'textAlign':'center'}}>{this.state.title}</Title>
				</div>
				<div>
					{tags}
				</div>
				<div style={{'paddingTop':'50px', 'objectFit':'cover', 'position':'relative'}}>
					<ReactMarkdown source={this.state.content} escapeHtml={false}/>
				</div>
			</div>
		)
	}
}

export default Article;