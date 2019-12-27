import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string('Nome deve ser alfanumérico').required(
        'Nome é obrigatório'
      ),
      email: Yup.string('E-mail deve ser alfanumérico')
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
      address: Yup.string('Endereço deve ser alfanumérico').required(
        'Endereço é obrigatório'
      ),
      city: Yup.number('Cidade deve ser inteiro').required(
        'Cidade é obrigatória'
      ),
      state: Yup.number('Estado deve ser inteiro').required(
        'Estado é obrigatório'
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({ error: err.errors, details: err.inner });
  }
};
