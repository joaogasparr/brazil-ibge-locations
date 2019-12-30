import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';
import ibge from '~/services/ibge';
import schema from '~/validators/User';

import Header from '~/components/Title';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import SelectAsync from '~/components/SelectAsync';
import Select from '~/components/Select';

import DefaultLayout from '~/pages/_layouts/default';

import { Container, Content } from './styles';

export default function Create() {
  const [users, setUsers] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [cities, setCities] = useState([]);
  const { id } = useParams();

  const filteredOptions = useMemo(() => {
    const data = cities.filter(city => city.state === selectedState.id);

    return data;
  }, [selectedState.id]);

  useEffect(() => {
    async function loadCities() {
      try {
        const response = await ibge.get('/municipios');

        const data = response.data.map(city => ({
          id: city.id,
          title: city.nome,
          state: city.microrregiao.mesorregiao.UF.id,
        }));

        setCities(data);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }

    loadCities();
  }, []);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get(`/users/${id}`);

        setUsers({
          name: response.data.name,
          email: response.data.email,
          address: response.data.address,
        });
      } catch (err) {
        toast.error(err.response.data.error);
        history.push('/user');
      }
    }

    if (id) {
      loadUser();
    }
    loadStateOptions();
  }, [id]);

  const loadStateOptions = useCallback(async inputValue => {
    try {
      const response = await ibge.get('/estados');

      const data = response.data.map(state => ({
        id: state.id,
        title: `${state.nome} - ${state.sigla}`,
      }));

      setStates(data);
      return data;
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }, []);

  async function newUser(data) {
    try {
      await api.post('/users', data);

      toast.success(`O Usuário foi cadastrada com sucesso!`);

      history.push('/user');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function updateUser(data) {
    try {
      await api.put(`/users/${id}`, data);

      toast.success(`O Usuário foi alterado com sucesso!`);

      history.push('/user');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function handleSubmit(data) {
    const { name, email, address, state, city } = data;
    if (id) {
      await updateUser({ name, email, address, city, state });
    } else {
      await newUser({ name, email, address, city, state });
    }
  }

  return (
    <DefaultLayout>
      <Container>
        <Form initialData={users} schema={schema} onSubmit={handleSubmit}>
          <Header text={id ? 'Edição de usuário' : 'Cadastro de usuário'}>
            <Link to="/user">
              <Button
                type="button"
                text="VOLTAR"
                color="#CCCCCC"
                icon={<MdKeyboardArrowLeft size={20} color="#FFF" />}
              />
            </Link>

            <Button
              type="submit"
              text="SALVAR"
              color="#24488A"
              icon={<MdDone size={20} color="#FFF" />}
            />
          </Header>
          <Content>
            <TextInput
              name="name"
              type="text"
              label="NOME COMPLETO"
              placeholder="John Doe"
            />
            <TextInput
              name="email"
              type="text"
              label="ENDEREÇO DE E-MAIL"
              placeholder="exemplo@email.com"
            />
            <TextInput
              name="address"
              type="text"
              label="ENDEREÇO RESIDENCIAL"
              placeholder="Rua Exemplo, 1117"
            />
            <SelectAsync
              name="state"
              label="ESTADO"
              placeholder="Selecione o estado"
              options={states}
              onChange={setSelectedState}
              noOptionsMessage={() => 'Nenhum estado foi encontrado...'}
              loadOptions={loadStateOptions}
              cacheOptions
            />
            <Select
              name="city"
              label="CIDADE"
              placeholder="Selecione a cidade"
              options={filteredOptions}
              onChange={setCities}
              noOptionsMessage={() => 'Nenhuma cidade foi encontrada...'}
            />
          </Content>
        </Form>
      </Container>
    </DefaultLayout>
  );
}

Create.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Create.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
