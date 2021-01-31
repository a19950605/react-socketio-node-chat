import React from 'react';
import Chat from './Chat';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Chat.css';

const ChatBody = () => {
	const [userData, setUserData] = useState([]);
	const search = useLocation().search;
	const [name, setName] = useState('');
	const id = new URLSearchParams(search).get('uid');
	const rm = new URLSearchParams(search).get('room');
	const [room, setRoom] = useState('');
	const [myName, setMyName] = useState('');
	const [filterName, setFilterName] = useState('');
	const [friendId, setFriendId] = useState('');
	const data = async () => {
		const d = await axios.get(`http://localhost:3001/friend/${id}`);
		const nm = await axios.get(`http://localhost:3001/user/${id}`);

		setMyName(nm.data.user.username);
		setUserData(d.data.Friend.friends);
	};

	useEffect(() => {
		data();
	}, []);
	useEffect(() => {}, [room]);

	const ftr = (e) => {
		setFilterName(e.target.value);
	};
	return (
		<div>
			<div>{myName}</div>
			<div className="main-container ">
				<div className="left-container">
					{' '}
					<div className="userList-item top-item ">
						<input
							type="text"
							className="search-field"
							value={filterName}
							onChange={ftr}
							placeholder="Search friend"
						/>
						<i class="fas fa-user-plus friend-icon"></i>
					</div>
					{userData
						.filter((user) => user.friend.username.search(filterName) > -1)
						.map((user) => (
							<div
								className="userList-item "
								onClick={() => {
									setRoom(user.roomId);
									setName(user.friend.username);
									setFriendId(user.friend._id);
								}}
							>
								<div className="userList-item-content">{user.friend.username}</div>
							</div>
						))}
				</div>
				<div className="right-container">
					<Chat room1={room} username={name} friendId={friendId} />
				</div>
			</div>
		</div>
	);
};

export default ChatBody;
