import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.random.number(),
  state: faker.random.number(),
});

export default factory;
