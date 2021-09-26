import { Map, GoogleApiWrapper } from "google-maps-react";
import { Component } from "react";

export class LocationModal extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                style={{ width: "100%", height: "80%" }}
                initialCenter={{
                    lat: this.props.coords.latitude,
                    lng: this.props.coords.longitude,
                }}
                zoom={14}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBJ3I82lQN9arSLcD22tDm2SOPSy4gpe78",
})(LocationModal);
