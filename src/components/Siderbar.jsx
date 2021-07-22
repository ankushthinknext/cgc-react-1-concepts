import React from "react";
import sidebarLinks from "./sidebarlinks";

function Siderbar() {
	return (
		<div class="m-sidebar">
			{sidebarLinks.map((link) => (
				<div key={link.id} className={link.classes.join(" ")}>
					<h4>{link.icon}</h4>
					<h6>{link.label}</h6>
				</div>
			))}
		</div>
	);
}

export default Siderbar;
