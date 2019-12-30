import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string('Nome deve ser alfanumérico').required('Nome é obrigatório'),
  email: Yup.string('E-mail deve ser alfanumérico')
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  address: Yup.string('Endereço deve ser alfanumérico').required(
    'Endereço é obrigatório'
  ),
  city: Yup.string('Cidade deve ser alfanumérico').required(
    'Cidade é obrigatória'
  ),
  state: Yup.string('Estado deve ser alfanumérico').required(
    'Estado é obrigatório'
  ),
});

export default schema;
