import React from "react"
import VideoPlayer from 'react-video-js-player';

class LiveContent extends React.Component {
	constructor(){
		super();
    	this.state = {
        	video: {
	            src: "livesrc/live.m3u8",
	        }
    	}
	}

  	render() {
	    return (
	    	<div style={{textAlign: "center"}}>
		    	<div style={{display: "inline-block", paddingTop: "2vh"}}> 
		            <VideoPlayer
		                autoplay = {true}
		                src={this.state.video.src}
		                fluid = "true"
		            />
		        </div>
	        </div>
	    )
  	}
}

export default LiveContent;