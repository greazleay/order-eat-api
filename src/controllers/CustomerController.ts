import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Customer } from "./../entities/Customer";

export class CustomerController {

    private customerRepository = getRepository(Customer);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.customerRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.customerRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { email, password, firstName, lastName, age, address } = request.body;
        const customer = new Customer();

        customer.email = email;
        customer.password = await Customer.hashPassword(password);
        customer.firstName = firstName;
        customer.lastName = lastName;
        customer.age = age;
        customer.address = address;
        
        await this.customerRepository.save(customer);
        return customer;
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let customerToRemove = await this.customerRepository.findOne(request.params.id) as Customer;
        await this.customerRepository.remove(customerToRemove);
    }

}