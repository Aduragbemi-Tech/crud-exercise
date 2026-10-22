
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key';

app.use(express.json());

// Store users and articles
const users = [];

const articles = [
    {
        id: 1,
        title: "Introduction to REST API",
        content: "REST APIs allow applications to communicate over HTTP."
    },
    {
        id: 2,
        title: "Getting Started with Express.js",
        content: "Express.js is a lightweight framework for building web applications and APIs."
    }
];

// SIGNUP
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Name, email and password are required'
        });
    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(409).json({
            message: 'User already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword
    };

    users.push(user);

    res.status(201).json({
        message: 'User registered successfully'
    });
});

// LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
});

// AUTHENTICATION MIDDLEWARE
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authentication token required'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
}

// PROTECTED PROFILE ROUTE
app.get('/profile', authenticateToken, (req, res) => {
    res.json({
        message: 'Protected resource accessed successfully',
        user: req.user
    });
});

// PROTECT ALL ARTICLE ROUTES
app.use('/articles', authenticateToken);

// CREATE AN ARTICLE
app.post('/articles', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: 'Title and content are required'
        });
    }

    const newArticle = {
        id: articles.length
            ? Math.max(...articles.map(article => article.id)) + 1
            : 1,
        title,
        content
    };

    articles.push(newArticle);

    res.status(201).json(newArticle);
});

// GET ALL ARTICLES
app.get('/articles', (req, res) => {
    res.json(articles);
});

// GET ONE ARTICLE
app.get('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const article = articles.find(article => article.id === id);

    if (!article) {
        return res.status(404).json({
            message: 'Article not found'
        });
    }

    res.json(article);
});

// REPLACE AN ARTICLE
app.put('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const article = articles.find(article => article.id === id);

    if (!article) {
        return res.status(404).json({
            message: 'Article not found'
        });
    }

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: 'Title and content are required'
        });
    }

    article.title = title;
    article.content = content;

    res.json(article);
});

// UPDATE PART OF AN ARTICLE
app.patch('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const article = articles.find(article => article.id === id);

    if (!article) {
        return res.status(404).json({
            message: 'Article not found'
        });
    }

    const { title, content } = req.body;

    if (title !== undefined) {
        article.title = title;
    }

    if (content !== undefined) {
        article.content = content;
    }

    res.json(article);
});

// DELETE AN ARTICLE
app.delete('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = articles.findIndex(article => article.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Article not found'
        });
    }

    const deletedArticle = articles.splice(index, 1);

    res.json({
        message: 'Article deleted successfully',
        article: deletedArticle[0]
    });
});

// START THE SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
