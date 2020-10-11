import React from 'react'
import $ from 'jquery'
import { Tag } from 'antd';
import { Typography } from 'antd';
// import 'showdown-prettify'
import showdown from 'showdown';
import './Article.css'

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
			return (<Tag color={"#" + randomColor} style={{'float': 'right'}} key={tag}>{tag}</Tag>)
		})
		
		var converter = new showdown.Converter();
		converter.setOption('ghCodeBlocks', 'true');
        converter.setOption('disableForced4SpacesIndentedSublists', 'true');
	    var innerHtml = converter.makeHtml(this.state.content);

		// console.log(innerHtml);
		return (
			<div style={{'padding':'20px 50px 5em', 'objectFit':'cover', 'position':'relative', backgroundColor: "#FFFFFF"}}>
				<div>
					<Title style={{'paddingBottom':'20px', 'textAlign':'center'}}>{this.state.title}</Title>
				</div>
				<div>
					{tags}
				</div>
				<div style={{'paddingTop':'50px', 'objectFit':'cover', 'position':'relative'}}>
					<div className="content" id="article" dangerouslySetInnerHTML={{__html: innerHtml}}></div>
				</div>
			</div>
		)
	}
}

export default Article;
