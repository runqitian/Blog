import React from 'react';
import './Header.css'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';

class Header extends React.Component{

	state = {
    	current: 'blogs',
  	};

  	handleClick = e => {
	    console.log('click ', e);
	    this.setState({
	      current: e.key,
	    });
	};

	render(){
		return (
			<div className="BlogHeader RowHeight">
				<h1 className="RowTextHeight" style={{"display":"inline", "marginLeft":"20px"}}>Runqi</h1>
				<Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" className="RowHeight" style={{"float":"right", "marginRight":"20px"}}>
        			<Menu.Item className="RowHeight" key="blogs">	
        				<a className="RowTextHeight" style={{"fontSize": "18px"}}>Blogs</a>
        			</Menu.Item>
        			<Menu.Item className="RowHeight" style={{"marginLeft":"20px"}} key="resources">	
        				<a className="RowTextHeight" style={{"fontSize": "18px"}}>Resources</a>
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