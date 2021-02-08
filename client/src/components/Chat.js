import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Chat.css';
import Picker from 'emoji-picker-react';
import { notify } from '../actions/newMsgActions';
import ScrollToBottom from 'react-scroll-to-bottom';

import UserList from './UserList';

var socket;

const Chat = ({ room1, username, friendId }) => {
	const dispatch = useDispatch();
	const [chosenEmoji, setChosenEmoji] = useState(null);

	const [userData, setUserData] = useState([]);
	const [user, setCurrentUser] = useState({});
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [messages2, setMessages2] = useState([]);
	const [notification, setNotification] = useState(false);
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
	const onEmojiClick = (event, emojiObject) => {
		//	setChosenEmoji(emojiObject);
		console.log(emojiObject.emoji);
		setMessage(message + emojiObject.emoji);
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
			//	setNotification(true);
			//dispatch(notify(id, room));
			console.log('receive msg from server', message, room);
		});
		socket.on('notify', ({ message, id, room }) => {
			setNotification(true);

			dispatch(notify(id, room));
			console.log(message, room);
		});
	}, []);

	return (
		<div className="container ">
			<div className="receiver-name " onClick={() => setNotification(false)}>
				{' '}
				{username || 'choose a user'}
			</div>{' '}
			<hr />
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
				{/*	<Picker
					onEmojiClick={onEmojiClick}
					pickerStyle={{
						width: '70%',
						height: '50%',
						background: 'blue',
						color: 'white',
						position: 'absolute',
						right: '30px',
						bottom: '20px',
					}}
				/>*/}
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
