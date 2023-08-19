import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUsecase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("John", new Address("Street", 123, "Zip", "City"));

const customer2 = CustomerFactory.createWithAddress("Jane", new Address("Street", 123, "Zip", "City"));

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        find: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for list customer use case", () => {

    it("should list a customer", async () => {
        const repository = MockRepository();

        const useCase = new ListCustomerUsecase(repository);

        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);

        expect(output.customers[0].id).toBe(customer1._id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);

        expect(output.customers[1].id).toBe(customer2._id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
    })
})
