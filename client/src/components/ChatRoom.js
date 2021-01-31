import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
	const [userId, setUserId] = useState('');

	const uid = (e) => {
		setUserId(e.target.value);
	};
	return (
		<div>
			test
			<input type="text" value={userId} onChange={uid} />
			<Link to={`/chat?uid=${userId}`}>login</Link>
		</div>
	);
};

export default Join;
