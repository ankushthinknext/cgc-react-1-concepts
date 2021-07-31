import React, { useState } from "react";
import sidebarLinks from "./sidebarlinks";
import { Link, useLocation } from "react-router-dom";

function Siderbar(props) {
	const [links, setLinks] = useState(sidebarLinks);
	const loc = useLocation().pathname.split("/");

	// const handleSelection = (id) => {
	// 	let clone = [...links];

	// 	let index = clone.findIndex((link) => link.id === id);
	// 	//reset with only sidebar-links class
	// 	clone.forEach((link) => {
	// 		link["classes"] = [];
	// 		link["classes"].push("sidebar-links");
	// 	});
	// 	clone[index]["classes"].push("active");
	// 	setLinks(clone);
	// };
	// onClick={() => handleSelection(link.id)}

	return (
		<div class="m-sidebar">
			{links.map((link) => (
				<Link to={`/dashboard/${link.path}`}>
					<div
						key={link.id}
						className={`${link.classes.join(" ")} ${
							loc.includes(link.path) ? "active" : ""
						}`}>
						<h4>{link.icon}</h4>
						<h6>{link.label}</h6>
					</div>
				</Link>
			))}
		</div>
	);
}

export default Siderbar;
