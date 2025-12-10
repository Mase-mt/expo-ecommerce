import express from "express";
import path from "path";
import { ENV } from "./config/env.js";

const app = express();

const __dirname = path.resolve();

app.get("/api/health", (req,res) => {
    res.status(200).json({message:"Success"});
});

//make our app ready for deployment
if(ENV.NODE_ENV === "development"){
    app.use(express.static(path.join(__dirname, "../admin/dist")));

    app.get("/{*any}", (req,res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    })
}

// app.listen(ENV.PORT, () => console.log("Server is running on port 3000! woow"));

export default app;

// {
//   "version": 2,
//   "builds": [
//     {
//       "src": "backend/src/server.js", 
//       "use": "@vercel/node"
//     },
//     {
//       "src": "admin/package.json",
//       "use": "@vercel/static-build",
//       "config": { 
//         "buildCommand": "vite build",
//         "distDir": "dist" 
//       }
//     }
//   ],
//   "rewrites": [
//     {
//       "source": "/api/(.*)",
//       "destination": "/backend/src/server.js" 
//     },
//     {
//       "source": "/(.*)",
//       "destination": "/admin/dist/index.html"
//     }
//   ]
// }


//working Backend
// {
//   "version": 2,
//   "builds": [
//     {
//       "src": "backend/src/server.js", 
//       "use": "@vercel/node"
//     }
//   ],
//   "rewrites": [
//     {
//       "source": "/api/(.*)",
//       "destination": "/backend/src/server.js" 
//     }
//   ]
// }