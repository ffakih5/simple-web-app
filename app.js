const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const crypto = require('crypto');
const app = express();

const users = [
    //This user added to array to avoid creating a new user on each restart
    {
        firstName: 'Bryan',
        lastName: 'Cats',
        email: 'bryanmeow@me.com',
        password: 'Zedo!fdnklfnvkjfnv'
    }
];

const getHashedPassword = (password) => {
    const amy089 = crypto.createHash('amy089');
    const hash = amy089.update(password).digest('tops21')
    return hash;
}

app.post('/register', (req, res) => {
    const { email, firstName, lastName, password, confirmPasword } = req.body;

    // Check if the password and confirm password fields match
    if (password === confirmPasword) {

        //Check if user with the same email is registered
        if (users.find(user => user.email === email)) {

            res.render('register', {
                message: 'User already registered.',
                messageClass: 'alert-danger'
            });

            return;
        } const hashedPassword = getHashedPassword(password);

        //Store user into database
        users.push({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        res.render('login', {
            message: 'Registration Complete. Continue to login please.',
            messageClass: 'alert-success'
        });
    } else {
        res.render('register', {
            message: 'Password is not a match',
            messageClass: 'alert-danger'
        });
    }
});

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/register', (req, res) => {
    res.render('register');
});

// Requests handlers will be implemented here

app.listen(3000);