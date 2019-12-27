import { Op } from 'sequelize';

import User from '../models/User';

class UserController {
  async index(req, res) {
    const { page = 1, name = '' } = req.query;

    const { count, rows: users } = await User.findAndCountAll({
      where: { name: { [Op.like]: `%${name}%` } },
      limit: 5,
      offset: (page - 1) * 5,
      attributes: [
        'id',
        'name',
        'email',
        'address',
        'city',
        'state',
        'created_at',
      ],
    });

    return res.json({ count: Math.ceil(count / 5), users });
  }

  async show(req, res) {
    const users = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'address', 'city', 'state'],
    });

    if (!users) {
      return res.status(400).json({ error: 'O usuário não encontrado!' });
    }

    return res.json(users);
  }

  async store(req, res) {
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com esse e-mail cadastrado.' });
    }

    const users = await User.create(req.body);

    return res.json(users);
  }

  async update(req, res) {
    const { email } = req.body;

    const users = await User.findByPk(req.params.id);

    if (email !== users.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário com esse e-mail cadastrado.' });
      }
    }

    const user = await users.update(req.body);

    return res.json(user);
  }

  async delete(req, res) {
    const users = await User.findByPk(req.params.id);

    await users.destroy();

    return res.json();
  }
}

export default new UserController();
