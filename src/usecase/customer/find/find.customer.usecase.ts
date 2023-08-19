import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {InputFindCustomerDto, OutputFindCustomerDto} from "./find.customer.dto";

export default class FindCustomerUsecase {

    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {

        /* A entidade não pode ir para fora, por isso, temos que retornar um "output" ao invés da entidade. */

        const customer = await this.customerRepository.find(input.id);

        return {
            id: customer._id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip
            }
        }
    }
}
