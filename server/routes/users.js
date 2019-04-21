const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/users");
const _ = require("lodash");
const { check, validationResult } = require("express-validator/check");
//==========================
//======== /api/user/....
//==========================

let loginValidations = [
  check("email").isEmail(),
  check("password").isLength({ min: 5 })
];

let signUpValidation = [
  check("email").isEmail(),
  check("password").isLength({ min: 5 }),
  check("username").isLength({ min: 5, max: 15 })
];

let changePasswordValidation = [
  check("password").isLength({ min: 5 }),
  check("oldPassword").isLength({ min: 5 })
];

router.all("/auth/facebook",function(req,res,next){
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
});

//function to check if the user is already logged in or not
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("You are not logged in!");
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: false, status: "You are not logged in!" });
  }
}

//Default get page:- Only for demo purpose
router.get("/", async function(req, res, next) {
  const result = await User.find({});
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    status: "You are in / page!",
    result: result
  });
});

//Sends the info of currently logged in user
router.get("/get-user", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send({ message: "The user does not exist" });
    }
  } catch (error) {
    res.status(400).send({ message: "Some error occured" });
  }
});
//Route for login:- uses passport local login strategy
router.post("/login", loginValidations, async (req, res, next) => {
  //   const { errors, isValid } = validateLoginInput(req.body);

  //   //Form related error
  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  //User with provided email check
  try {
    const user = await User.findOne({ "local.email": email });
    const errors = {};
    console.log(user);
    if (!user) {
      errors.email = "User with provided email does not exist";
      return res.status(404).json(errors);
    }
    console.log("Here before")
    console.log(password);
    if (user.validPassword(password)) {
      //Everything goes right

      //Manually serializing user  in passport session
      console.log("Here valid password");
      req.logIn(user, err => {
        if (err) {
          return res.status(400).send("Oops some error occured");
        }
        return res
          .status(200)
          .send({ message: "The user is successfully logged in " });
      });
    } else {
      errors.password = "Password incorrect";
      return res.status(400).json(errors);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

//Route for signup:- uses passport local-signup strategy
router.post("/signup", signUpValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({ errors: errors.array() });
  }
  console.log("Here");

  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ "local.email": email });
    let errors = {};
    if (user) {
      errors = [{ param: "email", msg: "Email already exist" }];
      return res.status(400).json({ errors: errors });
    }

    const newUser = await new User({
      local: {
        username: name,
        email,
        password
      }
    });

    newUser.local.password = newUser.generateHash(password);
    //saving the user
    await newUser.save();
    //Manually serializing user  in passport session
    req.login(newUser, err => {
      if (err) {
        return res.status(400).send("Oops some error occured");
      }
      return res.status(200).send(newUser);
    });
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

//Route for user logout
router.get("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    req.session.destroy();
    res.clearCookie("connect.sid"); // clean up session info from client-side
    return res.json({ msg: "logging you out" });
  } else {
    return res.json({ msg: "no user to log out!" });
  }
});

router.post("/change_password", isLoggedIn, changePasswordValidation, function(
  req,
  res,
  next
) {
  var user = req.user;
  console.log(user);
  // checking if don't have current local password or provided password is valid
  if (!user.local.password || user.validPassword(req.body.oldPassword)) {
    // if true - assign new password
    user.local.password = user.generateHash(req.body.password);
    user.save().then(
      user => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Password successfully changed"
        });
        return;
      },
      err => {
        console.log(err);
        return next(err);
      }
    );
    // if not valid - send error message
  } else {
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    return res.json({ success: false, status: "Wrong password" });
  }
});

router.get("/logout", async (req, res) => {
  try {
    await req.logout();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// router.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     prompt: "select_account",
//     scope: [
//       "https://www.googleapis.com/auth/plus.login",
//       "https://www.googleapis.com/auth/plus.profile.emails.read"
//     ]
//   })
// );

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    console.log("Google callback route is called");
    res.redirect("/dashboard");
  }
);

//FACEBOOK O AUTH
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    prompt: "select_account",
    scope: "email"
  })
);

//@route GET api/auth/facebook/callback
//@desc Facebook O Auth
//@access Public
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: true }),
  (req, res) => {
    console.log("Facebook callback route is called");

    res.redirect("/dashboard");
  },
);

// router.get("/auth/facebook/callback", function(req, res, next) {
//   passport.authenticate("facebook", function(err, user, info) {
//     if (err) {
//       console.log(err);
//       return next(err);
//     }
//     if (user) {
//       req.logIn(user, function(err) {
//         if (err) {
//           console.log("error when logging in");
//           return next(err);
//         }
//         res.status(200);
//         res.redirect("http://localhost:3000/dashboard");
//         return;
//       });
//     } else {
//       res.redirect("http://localhost:3000/login");
//       return;
//     }
//   })(req, res, next);
// });

// router.put("/", isLoggedIn, async (req, res) => {
//   const userId = req.user._id;
//   const data = {local:req.body};
//   try {
//     const updateResponse = await User.findByIdAndUpdate({ _id: userId }, data, {
//       upsert: true
//     });
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.json({
//       success: true,
//       status: "Put successfully created",
//       user:updateResponse
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

module.exports = router;
