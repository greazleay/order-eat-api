import { CustomerController } from "../controllers/CustomerController";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";

export const Routes = [{
    method: "get",
    route: "/customers/all",
    controller: CustomerController,
    action: "all",
    validation: [],
    middlewares: []
}, {
    method: "get",
    route: "/customers/:id",
    controller: CustomerController,
    action: "one",
    validation: [param("id").isInt()],
    middlewares: []
}, {
    method: "post",
    route: "/customers/register",
    controller: CustomerController,
    action: "save",
    validation: [
        body("firstName").isString().withMessage('firstName must be a string').notEmpty().withMessage('firstName must not be empty'),
        body("lastName").isString(), 
        body("age").isInt({ min: 1 }), 
        body("address").isString()],
    middlewares: []
}, {
    method: "delete",
    route: "/customers/:id",
    controller: CustomerController,
    action: "remove",
    validation: [param("id").isInt()],
    middlewares: []
}, {
    method: "post",
    route: "/customers/login",
    controller: AuthController,
    action: "login",
    validation: [
        body("email").isString().withMessage('email must be a string').notEmpty().withMessage('email must not be empty').isEmail().withMessage('email must be a valid email'),
        body("password").isString().withMessage('password must be a string').notEmpty().withMessage('password must not be empty'),
    ],
    middlewares: []
}];