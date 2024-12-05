const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = {
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
};
app.use(session(sessionOptions));

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }

    res.send(`あなたは${req.session.count}回このページを表示しました`);
});

app.get('/register', (req, res) => {
    const { username = 'Anonymous' } = req.query;
    req.session.username = username;
    res.redirect('/greet');
});

app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`ようこそ、${username}さん`);
})

app.listen(3000, () => {
    console.log('ポート3000で待受中...');
});