/* Essa classe será uma implementação de validação específica para a biblioteca "Yup". */

import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup"

/* Estamos utilizando uma interface para, a qualquer momento, conseguirmos trocar o Yup por
* uma outra biblioteca, que fará a validação. */
export default class CustomerYupValidator implements ValidatorInterface<Customer> {

    validate(entity: Customer): void {
        try {

            /* No Yup, setamos um schema e validamos ele. */

            const schema = yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required")
            })

            /* O "abortEarly: false" serve para fazermos com que o Yup não lance a mensagem
            * de erro assim que um erro foi gerado, e, ao invés disso, espere todos os erros
            * ocorrer e chame as mensagens de erro de forma conjunta. */

            schema.validateSync({
                    id: entity._id,
                    name: entity.name
                },
                {
                    abortEarly: false
                })
        } catch (errors) {
            const e = errors as yup.ValidationError;

            /* Para cada erro do Yup, adicionaremos no "NotificationError". */
            e.errors.forEach(error => {
                entity.notification.addError({
                    message: error,
                    context: "customer"
                })
            })
        }
    }
}
