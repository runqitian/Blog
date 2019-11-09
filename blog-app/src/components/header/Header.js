import React from 'react';
import './Header.css'
import 'antd/dist/antd.css';
import { Menu} from 'antd';
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
		return (
			<div className="BlogHeader RowHeight">
				<Link to={"/"}><h1 className="RowTextHeight" style={{"display":"inline", "marginLeft":"20px"}}>网站</h1></Link>
				<Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" className="RowHeight" style={{"float":"right", "marginRight":"20px"}}>
        			<Menu.Item className="RowHeight" key="blogs">
        				<Link to={"/"}><span className="RowTextHeight" style={{"fontSize": "18px"}}>Blogs</span></Link>
        			</Menu.Item>
        			<Menu.Item className="RowHeight" style={{"marginLeft":"20px"}} key="resources">	
        				<Link to={"/resources"}><span className="RowTextHeight" style={{"fontSize": "18px"}}>Resources</span></Link>
        			</Menu.Item>
        		</Menu>
			</div>
			)
	}
}

export default Header;


/**
<Paper square style={{"height": "100px", "float": "right"}}>
				<Tabs
					style={{"height": "100px", "float": "right"}}
				    value="any"
				    indicatorColor="primary"
				    textColor="primary"
				    centered
				>
				    <Tab style={{"height": "100px"}} label="Blogs" />
				    <Tab style={{"height": "100px"}} label="Resources" />
				</Tabs>
				</Paper>
**/