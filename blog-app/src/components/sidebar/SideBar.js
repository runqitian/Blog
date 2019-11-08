import React from "react"
import { List, Avatar } from 'antd';


class SideBar extends React.Component{
	render(){
		const data = [
		  {
		    title: '所有',
		  },
		  {
		    title: '统计学',
		  },
		  {
		    title: '机器学习',
		  },
		  {
		    title: '开发',
		  },
		];

		return (
			<List
			    itemLayout="horizontal"
			    style={{"marginTop":"25px"}}
			    dataSource={data}
			    renderItem={item => (
			      <List.Item style={{"height":"60px"}}>
			        <List.Item.Meta

			          title={<a>{item.title}</a>}
			        />
			      </List.Item>
			    )}
			/>
		)
	}
}

export default SideBar;