import React, { useState, useEffect } from "react";
import { paginate, makeArrayFromANumber, sorting } from "./utils/utils";
import queryString from "query-string";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
var allUsers = [];
function Users(props) {
	let queryData = props.location.search;
	queryData = queryString.parse(queryData);
	console.log(queryData);

	let [users, setUsers] = useState([]);
	const [pageSize, setPageSize] = useState(100);
	const [currentPage, setCurrentPage] = useState(0);
	const [sortColumn, setSortColumn] = useState(
		queryData.sortBy ? queryData.sortBy : "id",
	);
	const [sortOrder, setSortOrder] = useState(
		queryData.sortOrder ? queryData.sortOrder : "asc",
	);
	//pagination
	let data = paginate(users, currentPage, pageSize);
	//sorting
	data = data.length && sorting(data, sortColumn, sortOrder);
	let totalLink = Math.ceil(users.length / pageSize);
	let linksArray = makeArrayFromANumber(totalLink);

	useEffect(() => {
		async function getUsers() {
			let result = await fetch(
				"https://60efff36f587af00179d3c01.mockapi.io/persons",
			);
			let data = await result.json();
			allUsers = data;
			setUsers(data);
		}
		getUsers();
	}, []);

	const handlePageChange = (linkNo) => {
		if (linkNo === "previous") setCurrentPage(currentPage - 1);
		else if (linkNo === "next") setCurrentPage(currentPage + 1);
		else setCurrentPage(linkNo);
	};
	const handleSort = (key) => {
		setSortColumn(key);
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};
	const handleSearch = (e) => {
		let searchKeywords = e.target.value.toLowerCase();

		let filtered = allUsers.filter((user) => {
			let a = user.name.toLowerCase();
			return a.search(searchKeywords) !== -1;
		});
		setUsers(filtered);
	};
	const handleFiltering = (e) => {
		let filtered = allUsers.filter(
			(user) => user.isVerified === e.target.checked,
		);
		setUsers(filtered);
	};
	const handleDelete = (id) => {
		let copy = [...data];
		Swal.fire({
			title: "Are you sure?",
			text: "User will be deleted!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Delete",
		}).then((result) => {
			let filtered = data.filter((user) => user.id !== id);
			setUsers(filtered);

			if (result.isConfirmed) {
				deleteAUser(id);
			}
		});
		async function deleteAUser(id) {
			let result = await fetch(
				`https://60efff36f587af00179d3c01.mockapi.io/persons/${id}`,
				{
					method: "DELETE",
				},
			);
			if (result.status === 200) {
				Swal.fire(" User Deleted!");
			} else {
				Swal.fire({
					position: "top-end",
					icon: "warning",
					title: "Something went wrong",
					showConfirmButton: false,
					timer: 1500,
				});
				setUsers(copy);
			}
		}
	};

	return (
		<div>
			<div className="mb-3 mt-5 search-bar-wrapper">
				<input
					onKeyUp={handleSearch}
					type="email"
					className="form-control"
					id="exampleFormControlInput1"
					placeholder="Search the users...."
				/>
			</div>

			<Link to={`${props.match.path}/new`}>
				<button style={{ display: "block" }} className="btn btn-success ">
					Create User +
				</button>
			</Link>

			<div className="table-wrapper shadow-sm p-3 rounded">
				<table className="table m-table">
					<thead>
						<tr>
							<th>id</th>
							<th onClick={() => handleSort("name")}>name</th>
							<th>Profile picture</th>
							<th onClick={() => handleSort("age")}>age</th>
							<th onClick={() => handleSort("email")}>email</th>
							<th>
								{" "}
								Verification Status{" "}
								<input
									onClick={handleFiltering}
									className="ml-4"
									type="checkbox"
								/>
							</th>
						</tr>
					</thead>
					<tbody>
						{data.length &&
							data.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.name}</td>
									<td>
										<img className="avatar" src={user.avatar} alt="" />
									</td>
									<td>{user.age}</td>
									<td>{user.email}</td>

									<td>{user.isVerified ? "Verified" : "NOT Verified"}</td>
									<td>
										<button
											onClick={() => handleDelete(user.id)}
											className="btn btn-danger">
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<div className="pagination-block">
				<nav aria-label="Page navigation example">
					<ul className="pagination">
						<li onClick={() => handlePageChange("previous")} class="page-item ">
							<a class="page-link" href="#" tabindex="-1" aria-disabled="true">
								Previous
							</a>
						</li>
						{linksArray.map((link) => (
							<li
								onClick={() => handlePageChange(link)}
								className={`page-item ${currentPage === link && "active"} `}>
								<a className="page-link" href="#">
									{link + 1}
								</a>
							</li>
						))}
						<li onClick={() => handlePageChange("next")} class="page-item ">
							<a class="page-link" href="#" tabindex="-1" aria-disabled="true">
								Next
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default Users;
