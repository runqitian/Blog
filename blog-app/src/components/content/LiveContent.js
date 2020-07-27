import React from "react"
import VideoPlayer from 'react-video-js-player';

class LiveContent extends React.Component {
	constructor(){
		super();
    	this.state = {
        	video: {
	            src: "http://runqitian.com/resources/live.m3u8",
	        }
    	}
	}

  	render() {
	    return (
	    	<div> 
	            <VideoPlayer
	                autoplay = {true}
	                src={this.state.video.src}
	                width="720"
	                height="420"
	                display="block"
                    marginLeft="auto"
  					marginRight="auto"
	            />
	        </div>
	    )
  	}
}

export default LiveContent;