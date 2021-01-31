import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Chat.css';
import ScrollToBottom from 'react-scroll-to-bottom';

import UserList from './UserList';

var socket;

const Chat = ({ room1, username, friendId }) => {
	const [userData, setUserData] = useState([]);
	const [user, setCurrentUser] = useState({});
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [messages2, setMessages2] = useState([]);

	const search = useLocation().search;
	const [myName, setMyName] = useState('');
	const id = new URLSearchParams(search).get('uid');
	const [room, setRoom] = useState('');
	const getData = async (rm) => {
		const tempmsg = await axios.get(`http://localhost:3001/message/${rm}`);
		console.log(tempmsg.data.message);
		setMessages(tempmsg.data.message);

		console.log(messages);
	};
	useEffect(() => {
		setRoom(room1);
		if (room1) getData(room1);
	}, [room1]);

	const data = async () => {
		const d = await axios.get(`http://localhost:3001/friend/${id}`);
		const nm = await axios.get(`http://localhost:3001/user/${id}`);

		setMyName(nm.data.user.username);
		setUserData(d.data.Friend.friends);
	};
	useEffect(() => {
		data();
	}, []);

	// const userData = [
	// 	{
	// 		username: 'wilson',
	// 		id: '1',
	// 	},
	// 	{
	// 		username: 'peter',
	// 		id: '2',
	// 	},
	// 	{
	// 		username: 'ken',
	// 		id: '3',
	// 	},
	// 	{
	// 		username: 'jeff',
	// 		id: '4',
	// 	},
	// 	{
	// 		username: 'holo',
	// 		id: '5',
	// 	},
	// ];

	const dummy = 'aaa';

	const msg = (e) => {
		setMessage(e.target.value);
	};

	const submitMsg = (e) => {
		e.preventDefault();
		if (message) {
			socket.emit('sendmsg', { message, room, id, myName, friendId });

			setMessage('');
		}
	};

	// const fetchMessage = async () => {
	// const tempmsg = await axios.get('http://localhost:3001/message', {
	// 	roomId: room,
	// 	});
	// 	setMessages2(tempmsg);
	// };
	// fetchMessage();
	// console.log(messages2);
	useEffect(() => {
		var connectionOptions = {
			'force new connection': true,
			reconnectionAttempts: 'Infinity',
			timeout: 10000,
			transports: ['websocket'],
		};
		socket = io('http://localhost:3001', connectionOptions);
		console.log(socket);
		socket.on('connection', () => {
			console.log(`I'm connected with the back-end`);
		});
	}, []);

	useEffect(() => {
		if (room !== '') {
			socket.emit('joinRm', room);
		}
		setMessages([]);
	}, [room]);

	useEffect(() => {
		socket.on('msg', ({ message, id, room }) => {
			setMessages((messages) => [...messages, { message: message, from: id }]);

			console.log('receive msg from server', message, room);
		});
	}, []);

	return (
		<div className="container ">
			<div className="receiver-name">{username || 'choose a user'}</div> <hr />
			<ScrollToBottom className="content">
				{messages.map((m) =>
					m.from === id ? (
						<div className="message-container-me">
							<div id="myName"> {myName}</div>
							{m.message}
						</div>
					) : (
						<div className="message-container">
							{' '}
							<div id="myName"> {username}</div>
							{m.message}
						</div>
					)
				)}{' '}
			</ScrollToBottom>{' '}
			<div className="text-input">
				<input
					type="text"
					className="text-input-text"
					value={message}
					onChange={msg}
				/>{' '}
				<button onClick={submitMsg}>
					<i class="fas fa-2x fa-paper-plane"></i>
				</button>
			</div>
		</div>
	);
};

export default Chat;
