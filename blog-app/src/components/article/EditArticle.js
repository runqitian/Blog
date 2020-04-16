import React from 'react'
import $ from 'jquery'
import { Typography, Input, Divider, Button } from 'antd';

const { TextArea } = Input;

class EditArticle extends React.Component{
	constructor(){
		super();
		this.state = {
			title:'',
			tags:[],
			summary:'',
			content:''
		}
	}

	componentWillMount() {
		if (this.props.index === 'new'){
			return
		}
		$.ajax({
			url:'/api/blog/article/' + this.props.index,
			async:false,
			success:(data) => {
				const result = data
				this.setState({
					title:result.title,
					tags:result.tags,
					summary:result.summary,
					content:result.content
				})
			}
		})
	}

	handleClick() {
		var title = document.getElementById("titleInput").value
		var tags = document.getElementById("tagsInput").value
		var summary = document.getElementById("summaryInput").value
		var content = document.getElementById("contentInput").value
		// console.log(document.getElementById("titleInput").value)
		if (this.props.index === 'new'){
			$.ajax({
				url:'/api/blog/articles',
				type:"post",
				headers: { 
					"Content-Type": "application/json",
				    "x-access-token" : localStorage.getItem("token")
				},
				data: JSON.stringify({
					title: title,
					tags: tags,
					summary: summary,
					content: content
				}),
				async:false,
				success:(data) => {
					alert('添加完成！')
					window.location = '/admin'
				},
				error:(err) => {
					alert("添加失败")
				}
			})
		}
		else{
			$.ajax({
				url:'/api/blog/article/' + this.props.index,
				type:"put",
				headers: { 
					"Content-Type": "application/json",
				    "x-access-token" : localStorage.getItem("token")
				},
				data: JSON.stringify({
					title: title,
					tags: tags,
					summary: summary,
					content: content
				}),
				async:false,
				success:(data) => {
					alert('修改完成！')
					window.location = '/admin'
				},
				error:(err) => {
					alert("修改失败")
				}
			})
		}
  	}

  	// handleCancel() {
  	// 	alert('hello');
  	// }

	render(){
		var title = this.state.title;
		var content = this.state.content
		console.log(content);
		const { Title } = Typography;
		return (
			<div style={{'padding':'20px 50px 20px', 'position':'relative'}}>
				<div>
					<Title level={3} style={{'fontFamily':'Kaiti'}}>标题</Title>
					<TextArea
					  id="titleInput"
			          placeholder="set a title"
			          defaultValue = {title}
			          rows={1}
			        />
				</div>
				<Divider />
				<div>
					<Title level={3} style={{'fontFamily':'Kaiti'}}>标签</Title>
					<TextArea
					  id="tagsInput"
			          placeholder="set a title"
			          defaultValue = {this.state.tags.join(',')}
			          rows={1}
			        />
				</div>
				<Divider />
				<div>
					<Title level={3} style={{'fontFamily':'Kaiti'}}>摘要</Title>
					<TextArea
					  id="summaryInput"
			          placeholder="write summary"
			          defaultValue = {this.state.summary}
			          autoSize={{ minRows: 1, maxRows:  3}}
			        />
				</div>
				<Divider />
				<div>
					<Title level={3} style={{'fontFamily':'Kaiti'}}>内容</Title>
				  	<TextArea
				  	  id="contentInput"
			          placeholder="markdown here"
			          defaultValue = {this.state.content}
			          autoSize={{ minRows: 8, maxRows:  38}}
			        />
				</div>
				<div style={{'paddingTop':'50px', 'position':'relative', 'textAlign':'center'}}>
					<Button type="primary" onClick={this.handleClick.bind(this)}>提交</Button>
					<Button type="primary" style={{'marginLeft': '20px'}} onClick={() => {window.location='/admin';}}>取消</Button>
				</div>

			</div>
		)
	}
}

export default EditArticle;