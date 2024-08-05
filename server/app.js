const path = require('path')
const express = require('express')
const {app ,server} = require('./socket/socket')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const conversationRoutes = require('./routes/conversation.route')
const authRoutes = require('./routes/auth.route')
const messageRoutes = require('./routes/message.route');
const userRoutes = require('./routes/user.route')
const groupRoutes = require('./routes/group.conversation.route')

const _dirname = path.resolve()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', conversationRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api',userRoutes )
app.use('/api/groups', groupRoutes)


app.use(express.static(path.join(_dirname,"/client/dist")))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

const MONGODB_URI = 'mongodb+srv://anubhav7985:anubhav7985@cluster0.ciwxoyn.mongodb.net/chat?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(
    MONGODB_URI
).then(() => {
    console.log('Database Connected!!')
    server .listen(8000);
}).catch(err => {
    console.log(err)
})