/* Esse arquivo definirá como entraremos com dados para o usecase e como
* o usecase retornará para a camada que o chamou, ou seja, o input e o
* output do usecase. */

/* O controller não deve saber que existe uma entidade "customer" no
* domínio da aplicação. */

export interface InputFindCustomerDto {
    id: string;
}

export interface OutputFindCustomerDto {
    id: string;
    name: string;
    address: {
        street: string
        city: string
        number: number
        zip: string
    }
}
