import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '~/pages/SignIn';

import UserList from '~/pages/User/List';
import UserCreate from '~/pages/User/Create';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact render={SignIn} />

      <Route path="/user" exact component={UserList} />
      <Route path="/user/create" component={UserCreate} />
      <Route path="/user/:id" component={UserCreate} />
    </Switch>
  );
}
