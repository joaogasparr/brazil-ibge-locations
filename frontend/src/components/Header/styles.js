import styled from 'styled-components';

export const Container = styled.div`
  height: 64px;
  background: #0d2856;
  padding: 0 30px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 64px;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 45px;
      padding-right: 20px;
      border-right: 1px solid #24488a;
    }

    a {
      height: 18px;
      margin-left: 20px;

      font-size: 15px;
      font-weight: bold;
      color: #fff;
      line-height: 18px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;

    strong {
      display: block;
      font-size: 14px;
      height: 16px;
      color: #fff;
    }

    button {
      border: 0;
      height: 16px;
      margin-top: 4px;
      font-size: 14px;
      background: #0d2856;
      color: #fff;
    }
  }
`;
