import { CustomerController } from "../controllers/CustomerController";
import { body, param } from "express-validator";

export const Routes = [{
    method: "get",
    route: "/customers",
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
    route: "/customers",
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
}];