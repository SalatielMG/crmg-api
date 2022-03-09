import e from 'express';
import * as yup from 'yup';

export const clientIdRules = yup
.number()
.required('El id del cliente es requerido');

export const contractIdRules = yup.number()
.required('El id del contrato es requerido');