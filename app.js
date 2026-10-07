const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
        httpOnly: true
    }
}));

// Home page
app.get('/', (req, res) => {
    res.render('home');
});

// Part (a): Set session
app.get('/set-session', (req, res) => {
    req.session.username = 'admin';
    req.session.visitCount = 0;
    res.redirect('/dashboard');
});

// Authentication middleware
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Part (a) + (b): Protected dashboard
app.get('/dashboard', isAuthenticated, (req, res) => {
    if (typeof req.session.visitCount !== 'number') {
        req.session.visitCount = 0;
    }

    req.session.visitCount++;

    res.render('dashboard', {
        username: req.session.user.username,
        sessionId: req.sessionID,
        visitCount: req.session.visitCount
    });
});

// View session data
app.get('/session', (req, res) => {
    res.render('session', {
        sessionData: req.session
    });
});

// Destroy session
app.get('/destroy-session', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Login page
app.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }

    res.render('login', {
        error: null
    });
});

// Login processing
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Hardcoded credentials for demonstration only
    if (username === 'admin' && password === 'admin123') {
        req.session.user = {
            username: username
        };

        req.session.username = username;
        req.session.visitCount = 0;

        return res.redirect('/dashboard');
    }

    res.render('login', {
        error: 'Invalid username or password.'
    });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
