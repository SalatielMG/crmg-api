import * as yup from 'yup';
import { clientIdRules, contractIdRules } from './index.schema';

const bodyValidation = yup.object({
    contract: yup.object({
        serviceId: yup.number()
        .required('El id del servicio es requerido'),
        name: yup.string()
        .required('El nombre es requerido'),
        dateStart: yup.string()
        .required('La fecha de inicio es requerido')
        .test(dateString => new Date(dateString).toString() !== 'Invalid Date'),
        observation: yup.string()
        .nullable()
    })
})

export const GetContractClientSchema = yup.object({
    params: yup.object({
        clientId: clientIdRules
    })
});

export const CreateContractClientSchema = yup.object({
    body: bodyValidation
});

export const UpdateStatusContractClientSchema = yup.object({
    params: yup.object({
        contractId: contractIdRules
    }),
    body: yup.object({
        status: yup.string()
        .required('El nuevo status es requerido')
    })
});

export const UpdateContractClientSchema = yup.object({
    params: yup.object({
        contractId: contractIdRules
    }),
    body: bodyValidation
});

export const DeleteContractClientSchema = yup.object({
    params: yup.object({
        contractId: contractIdRules
    })
})