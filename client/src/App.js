import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Chat from './components/Chat';
import Join from './components/Join';
import UserList from './components/UserList';
import Login from './components/Login';
import ChatBody from './components/ChatBody';
var socket;
function App() {
	return (
		<Router>
			<Route path="/" exact component={Join} />
			<Route path="/chat" exact component={ChatBody} />
			<Route path="/chat/:id" component={Login} />
		</Router>
	);
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

	// const dummy = 'aaa';

	// const [room, setRoom] = useState('');
	// const [message, setMessage] = useState('');
	// const [messages, setMessages] = useState([]);

	// const msg = (e) => {
	// 	setMessage(e.target.value);
	// };

	// const submitMsg = (e) => {
	// 	e.preventDefault();
	// 	if (message) {
	// 		socket.emit('sendmsg', { message, room });

	// 		setMessage('');
	// 	}
	// };

	// useEffect(() => {
	// 	var connectionOptions = {
	// 		'force new connection': true,
	// 		reconnectionAttempts: 'Infinity',
	// 		timeout: 10000,
	// 		transports: ['websocket'],
	// 	};
	// 	socket = io('http://localhost:3001', connectionOptions);
	// 	console.log(socket);
	// 	socket.on('connection', () => {
	// 		console.log(`I'm connected with the back-end`);
	// 	});
	// }, []);
	// useEffect(() => {
	// 	socket.emit('joinRm', room);
	// }, [room]);
	// useEffect(() => {
	// 	socket.on('msg', (msg) => {
	// 		setMessages((messages) => [...messages, msg]);

	// 		console.log('receive msg from server', msg);
	// 	});
	// }, []);

	// return (
	// 	<div>
	// 		{room}
	// 		{dummy}
	// 		{message}
	// 		{messages.map((m) => (
	// 			<div>{m}</div>
	// 		))}
	// 		<button
	// 			onClick={() => {
	// 				setRoom('1');
	// 			}}
	// 		>
	// 			1
	// 		</button>{' '}
	// 		<button
	// 			onClick={() => {
	// 				setRoom('2');
	// 			}}
	// 		>
	// 			2
	// 		</button>
	// 		<input type="text" value={message} onChange={msg} />{' '}
	// 		<button onClick={submitMsg}>submit</button>
	// 	</div>
	// );
}

export default App;
