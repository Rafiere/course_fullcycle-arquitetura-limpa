import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUsecase from "./find.customer.usecase";

const customer = new Customer("123", "John")
const address = new Address("Street", 123, "Zip", "City")
customer.changeAddress(address)

/* Quando o método "find()" for chamado, será retornado o "customer". Estamos mockando
* o retorno desse método. */
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test find customer use case', () => {

    it("should find a customer", async () => {
        /* Um mock é uma classe falsa, que conseguimos escolher o comportamento
        * dela para cada método que for chamado. */
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUsecase(customerRepository);
        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip"
            }
        }
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    })

    it("it should not find a customer", () => {

        /* Vamos testar um cenário que o "123" não existe. */

        const customerRepository = MockRepository();

        const usecase = new FindCustomerUsecase(customerRepository);

        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found")
        });

        const input = {
            id: "123"
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found");
    })
})
