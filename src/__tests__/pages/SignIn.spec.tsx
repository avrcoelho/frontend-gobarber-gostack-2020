import React from 'react';
import { render, fireEvent, wait, act } from '@testing-library/react';

import SingIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth.tsx', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast.tsx', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SingIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    await act(async () => {
      fireEvent.change(emailField, { target: { value: 'johndoe@test.com' } });
      fireEvent.change(passwordField, { target: { value: '123456' } });

      fireEvent.click(buttonElement);
    });

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SingIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    await act(async () => {
      fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
      fireEvent.change(passwordField, { target: { value: '123456' } });

      fireEvent.click(buttonElement);
    });

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if login errors', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SingIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    await act(async () => {
      fireEvent.change(emailField, { target: { value: 'jonhdoe@test.com' } });
      fireEvent.change(passwordField, { target: { value: '123456' } });

      fireEvent.click(buttonElement);
    });

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
