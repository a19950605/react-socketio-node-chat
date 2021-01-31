import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
const UserList = () => {
	const [userData, setUserData] = useState([]);

	useEffect(() => {
		const data = async () => {
			const d = await axios.get(
				`http://localhost:3001/friend/600e3be1079dad5328adfc05`
			);

			console.log(d.data.Friend.friends);
			setUserData(d.data.Friend.friends);
			console.log(d.data.Friend.friends);
			console.log(userData);
		};
		data();
	}, []);
	console.log(userData);
	return (
		<div>
			{console.log(userData)}
			{userData.map((m) => (
				<div>{m._id}</div>
			))}
		</div>
	);
};

export default UserList;
