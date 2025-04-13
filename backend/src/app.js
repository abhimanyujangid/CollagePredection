import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import requestIp from "request-ip";
import { rateLimit } from "express-rate-limit";
import { dbInstance } from "./db/dbConnect.js";
import passport from "passport";

const app = new express();


app.use(requestIp.mw());

// Rate limiter to avoid misuse of the service and avoid cost spikes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req, res) => {
    return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${
        options.max
      } requests per ${options.windowMs / 60000} minutes`
    );
  },
});

app.use(
    cors({
        origin:'*',
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// app.use(morgan("dev")); //HTTP request logger middleware for node.js 

// required for passport
// app.use(
//     session({
//       secret: process.env.EXPRESS_SESSION_SECRET,
//       resave: true,
//       saveUninitialized: true,
//     })
//   ); // session secret
//   app.use(passport.initialize());
//   app.use(passport.session()); // persistent login sessions

// api routes
import { errorHandler } from "./middlewares/error.middlewares.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";

// * App routes
import userRouter from "./routes/user.routes.js";
import studentRoute from "./routes/student.routes.js"
import collegeAdminRoute from "./routes/collegeAdmin.routes.js";
import collegeRoute from "./routes/college.routes.js"
import collegeConstantDataRoute from "./routes/constantData.routes.js";


// * Seeding handlers
import { avoidInProduction } from "./middlewares/auth.middleware.js";


//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/students",studentRoute)
app.use("/api/v1/college-admins", collegeAdminRoute)
app.use("/api/v1/colleges",collegeRoute)
app.use("/api/v1/college-constant-data", collegeConstantDataRoute)

// * healthcheck
app.use("/api/v1/healthcheck", healthcheckRouter);




// common error handling middleware
app.use(errorHandler);

export default app;
