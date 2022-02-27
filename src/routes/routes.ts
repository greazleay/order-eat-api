import { CustomerController } from "../controllers/CustomerController";
import { body, param } from "express-validator";

export const Routes = [{
    method: "get",
    route: "/customers",
    controller: CustomerController,
    action: "all",
    validation: []
}, {
    method: "get",
    route: "/customers/:id",
    controller: CustomerController,
    action: "one",
    validation: [param("id").isInt()]
}, {
    method: "post",
    route: "/customers",
    controller: CustomerController,
    action: "save",
    validation: [
        body("firstName").isString(), 
        body("lastName").isString(), 
        body("age").isInt({ min: 1 }), 
        body("address").isString()]
}, {
    method: "delete",
    route: "/customers/:id",
    controller: CustomerController,
    action: "remove",
    validation: [param("id").isInt()]
}];