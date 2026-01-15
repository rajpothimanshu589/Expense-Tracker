// import jwt from "jsonwebtoken";

// const isAuthenticated = (req, res, next) => {
//   try {
//     const token = req.cookies.token; // read token from HttpOnly cookie

//     if (!token) {
//       return res.status(401).json({
//         message: "User not authenticated",
//         success: false
//       });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     if (!decoded) {
//       return res.status(401).json({
//         message: "Invalid token",
//         success: false
//       });
//     }

//     req.userId = decoded.userId;
//     next();

//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({
//       message: "Unauthorized",
//       success: false
//     });
//   }
// };

// export default isAuthenticated;


import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Fallback to cookie if needed
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Unauthorized",
      success: false
    });
  }
};

export default isAuthenticated;
