import {app, sequelize} from "../express"
import request from 'supertest'

describe("E2E tests for customer", () => {

    /* Queremos que, a cada teste, o "schema" seja recriado. */

    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should send a post to customer and receive a correct response", async () => {

        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "Zip"
                }
            })

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("Zip");
    })

    it("it should not create a customer", async () => {

        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
            })

        expect(response.status).toBe(500);
    })

    it("it should list all customers", async () => {

        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "Zip"
                }
            })

        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Jane",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "Zip"
                }
            })

        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/customer").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("John");
        expect(customer.address.street).toBe("Street");
        expect(customer.address.city).toBe("City");
        expect(customer.address.number).toBe(123);
        expect(customer.address.zip).toBe("Zip");

        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Jane");
        expect(customer2.address.street).toBe("Street");
        expect(customer2.address.city).toBe("City");
        expect(customer2.address.number).toBe(123);
        expect(customer2.address.zip).toBe("Zip");

        const listResponseXML = await request(app)
            .get("/customer")
            .set("Accept", "application/xml")
            .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    })
})
