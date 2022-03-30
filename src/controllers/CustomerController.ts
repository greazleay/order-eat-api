import { NextFunction, Request, Response } from "express";
import { Customer } from "@entities/Customer";

export class CustomerController {

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const customers = await Customer.find();
            const foundCustomers = customers.map(customer => {
                return {
                    id: customer.id,
                    email: customer.email,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    age: customer.age,
                    address: customer.address,
                    personalKey: customer.personalKey,
                    isActive: customer.isActive,
                    isAdmin: customer.role
                };
            });

            return foundCustomers;

        } catch (error) {
            return next(error);
        }
    };

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const customer = await Customer.findOneBy({ id: request.params.id });
            return customer;
        } catch (error) {
            return next(error)
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password, firstName, lastName, age, address } = request.body;
            const customer = new Customer();

            customer.email = email;
            customer.password = await Customer.hashPassword(password);
            customer.firstName = firstName;
            customer.lastName = lastName;
            customer.age = age;
            customer.address = address;
            customer.personalKey = await Customer.generatePersonalKey();

            await customer.save();
            return customer;
        } catch (error) {
            return next(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const customerToRemove = await Customer.findOneBy({ id: request.params.id }) as Customer;
            await customerToRemove.remove();
            return { status: 200, message: `Customer with id ${request.params.id} removed successfully` }
        } catch (error) {
            return next(error);
        }
    }

}