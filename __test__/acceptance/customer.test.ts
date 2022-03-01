import { Customer } from "../../src/entities/Customer";
import { Connection, createConnection } from "typeorm";
import app from "../../src/app"
import { Server } from "http";
import request from "supertest";

let connection: Connection, server: Server;

const testCustomer = {
    firstName: 'John',
    lastName: 'Doe',
    age: 48,
    address: 'Plot 45A, Lorem Street, Ipsium'
}

const testCustomerNoFirstName = {
    lastName: 'Doe',
    age: 48,
    address: 'Plot 45A, Lorem Street, Ipsium'
}

beforeEach(async () => {
    connection = await createConnection();
    // Clear Database
    await connection.synchronize(true);
    server = app.listen(3000);
});

afterEach(() => {
    connection.close();
    server.close();
})  


it('Should be no Customers initially', async () => {
    const response = await request(app).get('/customers');
    console.log(response.body);
});

it('Should Create a Customer', async () => {
    const response = await request(app).post('/customers').send(testCustomer);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(testCustomer);
});

it('Should not create a user if firstName is omitted', async () => {
    const res = await request(app).post('/customers').send(testCustomerNoFirstName);
    expect(res.status).toBe(400);
    expect(res.body.errors).not.toBeNull();
    // expect(res.body.errors.length).toBe(1)
});