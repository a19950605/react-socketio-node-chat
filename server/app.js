const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
var bodyParser = require('body-parser');
const { uuid } = require('uuidv4');
const dotenv = require('dotenv');
const User = require('./model/User');
const { v4: uuidv4 } = require('uuid');

const connectDB = require('./config/db');
const Friend = require('./model/Friend');
const Messsage = require('./model/Messsage');
dotenv.config();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.get('/', function (req, res) {
	res.sendfile('index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
	console.log('A user connected');

	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
		console.log('A user disconnected');
	});

	socket.on('joinRm', (room) => {
		if (socket.room) socket.leave(socket.room);
		console.log(socket.room || '1');
		socket.room = room;
		console.log('join', room);
		socket.join(room);
	});

	socket.on('sendmsg', ({ room, message, id, myName, friendId }) => {
		console.log(message, room);
		const chatMessage = new Messsage({
			from: id,
			to: friendId,
			message: message,
			roomId: room,
		});
		chatMessage.save();
		io.sockets.in(room).emit('msg', { message, id, room });
	});
});

app.post('/register', async (req, res) => {
	console.log(req.body);
	const { username, email, password } = req.body;

	const user = await User.create({
		username,
		email,
		password,
	});
	if (user) {
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});
app.get('/message/:id', async (req, res) => {
	const message = await Messsage.find({ roomId: req.params.id });
	console.log(req.params.id);
	console.log(message);
	res.json({ message }).status(200);
});

app.post('/friend', async (req, res) => {
	const roomId = uuidv4();
	const { myId, friendId } = req.body;

	const findFd = await User.findById(friendId);

	const friend = await Friend.create({
		friend: friendId,
		roomId: roomId,
	});
	const user = await User.findByIdAndUpdate(myId, {
		$push: { friends: friend },
	});

	const friend2 = await Friend.create({
		friend: myId,
		roomId: roomId,
	});

	const user2 = await User.findByIdAndUpdate(friendId, {
		$push: { friends: friend2 },
	});

	res.status(200).json({
		user,
		user2,
	});
});

app.get('/user', async (req, res) => {
	const users = await User.find();
	res.status(200).json({ users: users });
});
app.get('/user/:id', async (req, res) => {
	const user = await User.findById(req.params.id);
	res.status(200).json({ user: user });
});

app.get('/friend/:id', async (req, res) => {
	const Friend = await User.findById(req.params.id)
		.select('friends')
		.populate({
			path: 'friends',
			populate: { path: 'friend' },
		});

	res.status(200).json({ Friend });
});

http.listen(3001, function () {
	console.log('listening on *:3000');
	console.log(uuidv4());
});
