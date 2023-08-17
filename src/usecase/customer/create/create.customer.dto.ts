import Address from "../../../domain/customer/value-object/address";

export interface InputCreateCustomerDto {

    /* O input não deve conhecer o value object. */

    name: string;
    address: {
        street: string
        city: string
        number: number
        zip: string
    };
}

export interface OutputCreateCustomerDto {
    id: string;
    name: string;
    address: {
        street: string
        city: string
        number: number
        zip: string
    }
}
