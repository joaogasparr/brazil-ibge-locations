import React, { useState, useEffect } from 'react';
import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAdd, MdArrowBack, MdArrowForward } from 'react-icons/md';

import api from '~/services/api';

import Header from '~/components/Title';
import Button from '~/components/Button';
import Content from '~/components/Content';
import { Footer, FooterButton } from '~/components/Table';

import DefaultLayout from '~/pages/_layouts/default';

import { Container, UserTable, ShimmerLine } from './styles';

export default function List() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);

        const response = await api.get('users', {
          params: {
            page,
            name: search,
          },
        });

        const data = response.data.users.map(user => ({
          ...user,
          dateFormatted: format(
            parseISO(user.created_at),
            "d 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
        }));

        setUsers(data);
        setLastPage(response.data.count);
      } catch (err) {
        toast.error(err.response.data.error);
      }

      setLoading(false);
    }

    loadUsers();
  }, [search, page]);

  function handlePage(action) {
    const data = action === 'back' ? page - 1 : page + 1;
    setPage(data);
  }

  function handleSearchUser(e) {
    setPage(1);
    setSearch(e.target.value);
  }

  async function handleConfirmDeleteUser(id) {
    if (window.confirm('Deseja realmente excluir ?')) {
      try {
        await api.delete(`/users/${id}`);

        const response = users.filter(user => user.id !== id);

        setUsers(response);

        toast.success('O Usuário foi excluído com sucesso!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <DefaultLayout>
      <Container>
        <Header text="Gerenciando usuários" search onChange={handleSearchUser}>
          <Link to="/user/create">
            <Button
              type="submit"
              text="CADASTRAR"
              color="#24488A"
              icon={<MdAdd size={20} color="#FFF" />}
            />
          </Link>
        </Header>
        <Content>
          <UserTable>
            <thead>
              <tr>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>CRIADO EM</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>
                    <Shimmer>
                      <ShimmerLine />
                    </Shimmer>
                  </td>
                  <td>
                    <Shimmer>
                      <ShimmerLine />
                    </Shimmer>
                  </td>
                  <td>
                    <Shimmer>
                      <ShimmerLine />
                    </Shimmer>
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.dateFormatted}</td>
                    <td>
                      <div>
                        <Link to={`/user/${user.id}`}>
                          <button type="button">editar</button>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleConfirmDeleteUser(user.id)}
                        >
                          apagar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </UserTable>
        </Content>
        <Footer>
          <FooterButton
            name="next"
            color="#FFF"
            icon={<MdArrowBack size={20} color="#0d2856" />}
            limitPage={page === 1}
            onClick={() => handlePage('back')}
          />
          <span>Página {page}</span>
          <FooterButton
            name="next"
            color="#FFF"
            icon={<MdArrowForward size={20} color="#0d2856" />}
            limitPage={page === lastPage}
            onClick={() => handlePage('next')}
          />
        </Footer>
      </Container>
    </DefaultLayout>
  );
}
