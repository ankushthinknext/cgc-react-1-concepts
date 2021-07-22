import React, { Component } from "react";

export default class Person extends Component {
	data = { id: 2, name: "MOhit", location: "MOhali" };
	render() {
		return (
			<div>
				<h1>I am a person Component</h1>
				<h2>Name = {this.data.name}</h2>
				<h2>LOcation = {this.data.location}</h2>
			</div>
		);
	}
}
