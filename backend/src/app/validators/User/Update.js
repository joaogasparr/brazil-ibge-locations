import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string('Nome deve ser alfanumérico'),
      email: Yup.string('E-mail deve ser alfanumérico').email(
        'E-mail inválido'
      ),
      address: Yup.string('Endereço deve ser alfanumérico'),
      city: Yup.number('Cidade deve ser inteiro'),
      state: Yup.number('Estado deve ser inteiro'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({ error: err.errors, details: err.inner });
  }
};
