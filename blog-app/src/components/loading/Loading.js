import React from 'react';
import { Spin } from 'antd';

const LoadingIcon = () =>{
    return (<div style={{"textAlign":"center", "height":"100%"}}><Spin size="large" style={{"position":"absolute","top":"50%"}}/></div>)
}

export default LoadingIcon;