const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");
const admin = require("firebase-admin");
require('dotenv').config()

const path = require("path");
const { start } = require("repl");
//require('firebase/firestore'); 
const url = require('url');

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});

const csrfMiddleware = csrf({ cookie: true });

const PORT = process.env.PORT || 80;
const app = express();


app.use('/static', express.static('static')) //for seving static files
app.use(express.urlencoded({ extended: true }))
// app.use(express.urlencoded());//for getting filled data in form

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);


//PUG STUFFS
app.set('view engine', 'pug');// setting template engine as pug
app.set('views', path.join(__dirname, 'views'));//set the views directory 

//new
app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});
//new

app.get('/', (req, res) => {

  const tit = "ISMpetition";
  const parmas = { 'title': tit };
  res.status(200).render('index', parmas);
});




app.get('/home', (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((user) => {
      const tit = "ISMpetition | Home";
      const parmas = { 'title': tit, 'email': user.email };
      res.status(200).render('MainPage', parmas);
    })
    .catch((error) => {
      res.redirect("/signin-signup");
    });

});


app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 1 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
});


//for redirecting to sign in page
app.get('/signin-signup', (req, res) => {
  const tit = "ISMpetition | Sign In - Sign Up";
  const parmas = { 'title': tit };
  res.status(200).render('sign_in_sign_up', parmas);
});



//start-a-petition 
app.get('/start-a-petition', (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((user) => {
      const tit = "Start Your Petition";
      const parmas = { 'title': tit, 'email': user.email };
      res.status(200).render('start_petition', parmas);
    })
    .catch((error) => {
      res.redirect("/signin-signup");
    });


});

app.get('/preview', (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((user) => {
      const Petition = url.parse(req.url, true).query;
      console.log(Petition);
      Petition.email = user.email;
      res.status(200).render('preview', Petition);
    })
    .catch((error) => {
      res.redirect("/signin-signup");
    });
});

app.get('/petition', (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const id = queryObject.id;
  var parmas = { "id": id };
  res.status(200).render('petition', parmas);

});





app.listen(PORT, () => {
  console.log("the application started sucessfully");

})