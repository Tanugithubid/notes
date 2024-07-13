const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res) {
    fs.readdir(`./files`, function(err, files) {
        if (err) {
            return res.status(500).send("Unable to read files directory");
        }
        res.render("index", { files: files });
    });
});

app.get('/file/:filename', function(req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata) {
        if (err) {
            return res.status(500).send("Unable to read file");
        }
        res.render('show', { filename: req.params.filename, filedata: filedata });
    });
});

app.get('/edit/:filename', function(req, res) {
   res.render('edit');
});

app.post('/create', function(req, res) {
    fs.writeFile(`./files/${req.body.filename.split(" ").join("")}`, req.body.filedata, function(err) {
        if (err) {
            return res.status(500).send("Unable to create file");
        }
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
