const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  // Gets the list of books available in the shop
  return res.send(JSON.stringify(books))
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.send(JSON.stringify(books[isbn]));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    var author = req.params.author.replace("+", " ");
    var keys = Object.keys(books);
    keys.forEach(function(key){
        if(books[key].author == author) {
            return res.status(200).send(JSON.stringify(books[key]));
        }
    });
    return res.status(200).json({message: `Author ${author} has not been added.`});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    var title = req.params.title.replaceAll("+", " ");
    var keys = Object.keys(books);
    keys.forEach(function(key){
        if(books[key].title == title) {
            return res.status(200).send(JSON.stringify(books[key]));
        }
    });
    return res.status(200).json({message: `Title "${title}" has not been added`});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    return res.send(JSON.stringify(books[isbn].reviews));
});

module.exports.general = public_users;
