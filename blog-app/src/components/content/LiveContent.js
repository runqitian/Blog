import React from "react"
import VideoPlayer from 'react-video-js-player';

class LiveContent extends React.Component {
	constructor(){
		super();
    	this.state = {
        	video: {
	            src: "resources/live.m3u8",
	        }
    	}
	}

  	render() {
	    return (
	    	<div style={{textAlign: "center"}}>
		    	<div style={{display: "inline-block", marginTop: "20px"}}> 
		            <VideoPlayer
		                autoplay = {true}
		                src={this.state.video.src}
		                height="420"
		                style={{marginLeft:"20px"}}
		            />
		        </div>
	        </div>
	    )
  	}
}

export default LiveContent;