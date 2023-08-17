import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John", new Address("Street", 123, "Zip", "City"));

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "Street Updated",
        city: "City Updated",
        number: 123,
        zip: "Zip Updated"
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn()
    }
}

describe("", () => {

    it("it should update a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual(input)
    })
})
