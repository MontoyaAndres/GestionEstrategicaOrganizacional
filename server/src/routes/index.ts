import * as express from "express";

import { userAuth, adminAuth } from "./middlewareAuth";
import { confirmEmail } from "../modules/user/confirmEmail";
import register from "../modules/user/register";
import login from "../modules/user/login";
import postsList from "../modules/post/postsList";

const Router = express.Router();

Router
	// User module
	.post("/register", register.register)
	.post("/login", login.login)
	.get("/confirm/:id", confirmEmail)

	// Post module
	.get("/posts/:pagination", userAuth, postsList.showPosts)
	.get("/post/:id", userAuth, postsList.showPost)
	.post("/post", adminAuth, postsList.savePost)
	.put("/post/:id", adminAuth, postsList.updatePost)
	.delete("/post/:id", adminAuth, postsList.deletePost);

export default Router;
