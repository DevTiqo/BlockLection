import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

export class CameraFeed extends Component {
    /**
     * Processes available devices and identifies one by the label
     * @memberof CameraFeed
     * @instance
     */
    processDevices(devices) {
        devices.forEach(device => {
            console.log(device.label);
            this.setDevice(device);
        });
    }

    /**
     * Sets the active device and starts playing the feed
     * @memberof CameraFeed
     * @instance
     */
    async setDevice(device) {
        const { deviceId } = device;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
        this.videoPlayer.srcObject = stream;
        this.videoPlayer.play();
    }

    /**
     * On mount, grab the users connected devices and process them
     * @memberof CameraFeed
     * @instance
     * @override
     */
    async componentDidMount() {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
    }

    /**
     * Handles taking a still image from the video feed on the camera
     * @memberof CameraFeed
     * @instance
     */
    takePhoto = () => {
        const { sendFile } = this.props;
        const context = this.canvas.getContext('2d');
        context.drawImage(this.videoPlayer, 0, 0, 300, 300);
        // this.canvas.toDataURL(sendFile);
        this.canvas.toBlob(sendFile);
       

// this.canvas.toBlob(function(blob) {
//   var newImg = document.createElement('img'),
//       url = URL.createObjectURL(blob);

//   newImg.onload = function() {
//     // no longer need to read the blob so it's revoked
//     URL.revokeObjectURL(url);
//   };

//   newImg.src = url;
//   document.body.appendChild(newImg);
  
// },sendFile);

    };

    render() {
        return (
            <div className="c-camera-feed">
                <div className="c-camera-feed__viewer">
                    <video ref={ref => (this.videoPlayer = ref)} width="300" heigh="300" />
                </div>
                 
   <Button variant="primary" onClick={this.takePhoto}>
                    Capture
            </Button>
                <div className="c-camera-feed__stage">
                    <canvas width="300" height="300" ref={ref => (this.canvas = ref)} />
                </div>
            </div>
        );
    }
}