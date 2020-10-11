import React from 'react';
import './Header.css'
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'


class Header extends React.Component{

	state = {
    	current: 'blogs',
  	};

  	handleClick = e => {
	    this.setState({
	      current: e.key,
	    });
	};

	render(){
		var header_title;
		var header_link;
		if (this.props.admin){
			header_title = "管理员界面"
			header_link = "/admin"
		}
		else{
			header_title = ""
			header_link = "/"
		}
		return (
			<div className="BlogHeader" style={{"backgroundImage":"url(/header.jpg)","backgroundSize": "100% 100%"}}>
				<div style={{"position":"absolute", "left":"20px", "top":"40px"}}>
					<Link to={header_link}>
						<h1>{header_title}</h1>
					</Link>
				</div>
				<div style={{"position":"absolute", "bottom":"0px", "right":"10px", "backgroundColor":"transparent"}}>
					<div className="MenuFontStyle" onClick={() => {window.location=header_link}}>
						<p style={{"display":"inline", "userSelect": "none"}}>Blogs</p>
					</div>
					<div className="MenuFontStyle" onClick={() => {window.location="/resources"}}>
						<p style={{"display":"inline", "userSelect": "none"}}>Resources</p>
					</div>
					<div className="MenuFontStyle" onClick={() => {window.location="/live"}}>
						<p style={{"display":"inline", "userSelect": "none"}}>Live</p>
					</div>
				</div>
			</div>
			)
	}

	// <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark" className="RowHeight" style={{"position":"absolute", "bottom":"0px", "right":"0px", "backgroundColor":"transparent", "color":"white"}}>
 //        			<Menu.Item className="RowHeight" key="blogs" style={{"color":"white"}}>
 //        				<Link to={admin_prefix + "/"}><span className="RowTextHeight" style={{"fontSize": "18px"}}>Blogs</span></Link>
 //        			</Menu.Item>
 //        			<Menu.Item className="RowHeight" style={{"marginLeft":"20px"}} key="resources">	
 //        				<Link to={admin_prefix + "/resources"}><span className="RowTextHeight" style={{"fontSize": "18px"}}>Resources</span></Link>
 //        			</Menu.Item>
 //        		</Menu>
}

export default Header;
