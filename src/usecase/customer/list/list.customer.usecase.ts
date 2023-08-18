import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {InputListCustomerDto, OutputListCustomerDto} from "./list.customer.dto";
import Customer from "../../../domain/customer/entity/customer";

export default class ListCustomerUsecase {

    customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();

        return OutputMapper.toOutput(customers);
    }
}

// tslint:disable-next-line:max-classes-per-file
class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto {
        return {
            customers: customer.map(customer2 => {
                return {
                    id: customer2.id,
                    name: customer2.name,
                    address: {
                        street: customer2.Address.street,
                        city: customer2.Address.city,
                        number: customer2.Address.number,
                        zip: customer2.Address.zip
                    }
                }
            })
        }
    }
}
