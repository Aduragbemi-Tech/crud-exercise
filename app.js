const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

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



app.post("/articles", (req, res) => {
    const { title, content } = req.body;

    const newArticle = {
        id: articles.length + 1,
        title,
        content
    };

    articles.push(newArticle);

    res.status(201).json(newArticle);
});
app.get("/articles", (req, res) => {
    res.json(articles);
});
app.get("/articles/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const article = articles.find(article => article.id === id);

    if (!article) {
        return res.status(404).json({
            message: "Article not found"
        });
    }

    res.json(article);
});
app.put("/articles/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const article = articles.find(article => article.id === id);

    if (!article) {
        return res.status(404).json({
            message: "Article not found"
        });
    }

    const { title, content } = req.body;

    article.title = title;
    article.content = content;

    res.json(article);
});
app.patch("/articles/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const article = articles.find(article => article.id === id);

    if (!article) {
        return res.status(404).json({
            message: "Article not found"
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
app.delete("/articles/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = articles.findIndex(article => article.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Article not found"
        });
    }

    const deletedArticle = articles.splice(index, 1);

    res.json({
        message: "Article deleted successfully",
        article: deletedArticle[0]
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});