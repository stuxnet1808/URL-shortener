const {getUser} = require("../service/auth");


function checkForAuthentication(req, res, next) {
  //const authorizationHeaderValue = req.headers["authorization"];
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) {
      return next();
  }

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;

  return next();
}


function restrictTo(roles = []){
  return function(req, res, next){
    if(!req.user) return res.redirect("/login");
    //console.log(req.user);

    // if(!roles.includes(req.user.roles)) return res.end("UnAuthorized");

    next();
  };
}

// async function restrictToLoggedinUserOnly(req, res, next){
//   //const userUid = req.cookies?.uid;
//   const userUid = req.headers["Authorization"];
//   console.log(req.headers);
  
//   if(!userUid) return res.redirect("/login");
//   const token = userUid.split('Bearer')[1].trim();    //bearer [ghuioeokdjvnm03]
//   const user = getUser(token);

//   if(!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next){
//   //const userUid = req.cookies?.uid ;
//  // Accessing the authorization header correctly
// const userUid = req.headers['authorization'];

// if (typeof userUid !== 'undefined' && userUid.includes('Bearer')) {
//     // Splitting and trimming the token
//     const token = userUid.split('Bearer ')[1].trim();
    
//     // Getting the user with the token
//     const user = getUser(token);
    
//     // Assigning the user to req.user
//     req.user = user;
// } else {
//     // Handling the case where the authorization header is missing or incorrect
//     console.error('Authorization header is missing or does not contain "Bearer"');
//     // You may want to throw an error or handle this case as appropriate
// }

//   next();
// }

module.exports = {
  restrictTo,
  checkForAuthentication,
};