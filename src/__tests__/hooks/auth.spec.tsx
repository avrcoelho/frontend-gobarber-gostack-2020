import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';
import { useAuth, AuthProvider } from '../../hooks/auth';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should ble able to sign in', async () => {
    const apiResponde = {
      user: { id: '123', name: 'Jonh Doe', email: 'johndoe@test.com' },
      token: '1234',
    };

    apiMock.onPost('sessions').reply(200, apiResponde);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@test.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(result.current.user.email).toBe('johndoe@test.com');
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponde.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponde.user),
    );
  });

  it('should restore saved data form storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return '1234';
        case '@GoBarber:user':
          return JSON.stringify({
            id: '123',
            name: 'Jonh Doe',
            email: 'johndoe@test.com',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toBe('johndoe@test.com');
  });

  it('should be able to signout', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return '1234';
        case '@GoBarber:user':
          return JSON.stringify({
            id: '123',
            name: 'Jonh Doe',
            email: 'johndoe@test.com',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able update data', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: '123',
      name: 'Jonh Doe',
      email: 'johndoe@test.com',
      avatar_url: 'image.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
    expect(result.current.user).toEqual(user);
  });
});
