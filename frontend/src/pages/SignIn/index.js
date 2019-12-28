import React from 'react';
import { Form } from '@rocketseat/unform';
import SubmitButton from '~/components/Button';

import history from '~/services/history';
import AuthLayout from '~/pages/_layouts/auth';

import logo from '~/assets/logo.svg';
// import { Container } from './styles';

export default function SignIn() {
  function handleSubmit() {
    history.push('/user');
  }

  return (
    <AuthLayout>
      <img src={logo} alt="Radar Governamental" />

      <Form onSubmit={handleSubmit}>
        <SubmitButton type="submit" color="#24488A" text="Entrar no sistema" />
      </Form>
    </AuthLayout>
  );
}
