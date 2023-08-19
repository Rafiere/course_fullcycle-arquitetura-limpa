import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default class CustomerValidatorFactory {

    /* Essa factory é responsável por validar um validator que tenha essa interface. Se quisermos
    * trocar o Yup por outra biblioteca de validação, basta retornarmos outro validador, com outra
    * generic. */

    static create(): ValidatorInterface<Customer> {
        return new CustomerYupValidator()
    }
}
