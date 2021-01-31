import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
	const [userId, setUserId] = useState('');
	const [roomId, setRoomId] = useState('');

	const uid = (e) => {
		setUserId(e.target.value);
	};
	const rid = (e) => {
		setRoomId(e.target.value);
	};
	return (
		<div>
			<div class="login-box">
				{/*
				<form action="" className="">
					<input type="text" value={userId} onChange={uid} />
					<input type="text" value={roomId} onChange={rid} />
					<Link to={`/chat?uid=${userId}&room=${roomId}`}>login</Link>
				</form>*/}

				<h2>Login</h2>
				<form>
					<div class="user-box">
						<input type="text" value={userId} onChange={uid} />

						<label>Username</label>
					</div>
					<div class="user-box">
						<input type="text" value={roomId} onChange={rid} />
						<label>Password</label>
					</div>
					<Link to={`/chat?uid=${userId}&room=${roomId}`}>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						login
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Join;
