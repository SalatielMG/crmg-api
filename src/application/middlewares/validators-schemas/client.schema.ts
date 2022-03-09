import * as yup from 'yup';
import { clientIdRules } from './index.schema';

const bodyValidation = yup.object({
    name: yup
        .string()
        .required('El nombre es requerido'),
    firstName: yup
        .string()
        .required('El apellido paterno es requerido'),
    lastName: yup
        .string()
        .required('El apellido materno es requerido'),
    address: yup
        .string()
        .required('La direccion es requerida'),
    email: yup
        .string()
        .nullable() // Not Required
        .optional()
        .email('El correo electrónico debe ser un email valido'),
    phoneNumber: yup
        .string()
        .length(10, 'El número de telefono debe ser de 10 dígitos')
});

export const GetClientSchema = yup.object({
    params: yup.object({
        clientId: clientIdRules
    })
})

export const CreateClientSchema = yup.object({
    body: bodyValidation
});

export const UpdateClientSchema = yup.object({
    body: bodyValidation,
    params: yup.object({
        clientId: clientIdRules
    })
})

export const DeleteClientSchema = yup.object({
    params: yup.object({
        clientId: clientIdRules
    })
})


