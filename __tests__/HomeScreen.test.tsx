import Home from '../src/screens/Home/HomeScreen';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext, UserContextProvider} from '../src/Context/Context';
import {API_URL} from '../API';

describe('Test for the home screen', () => {
  const mockSetUser = jest.fn();
  const user = {
    name: 'Usha',
    password: '1234',
    email: 'usha@gmail.com',
    contact: '23456789',
    about: 'me',
    address: 'wgl',
    pets: [],
  };
  it('Should test for the header', () => {
    const {getByText} = render(
      <NavigationContainer>
        <UserContext.Provider
          value={{
            user: user,
            setUser: mockSetUser,
          }}>
          <Home navigation={{replace: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    expect(getByText('My Pets')).toBeTruthy();
    expect(getByText('Add Pet')).toBeTruthy();
  });
  it('Should test for the no user in context', () => {
    const {getByText} = render(
      <NavigationContainer>
        <UserContext.Provider
          value={{
            user: null,
            setUser: mockSetUser,
          }}>
          <Home navigation={{replace: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    expect(getByText('Something went wrong.')).toBeTruthy();
  });
  it('Should test for the no context', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Home navigation={{replace: jest.fn()}} />
      </NavigationContainer>,
    );

    expect(getByText('Something went wrong')).toBeTruthy();
  });
});

global.fetch = jest.fn(); 
describe('Test for pets data fetching', () => {
  const mockSetUser = jest.fn();
  const user = {
    name: 'Usha',
    password: '1234',
    email: 'usha@gmail.com',
    contact: '23456789',
    about: 'me',
    address: 'wgl',
    pets: [],
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch pets data', async () => {
    const mockPets = [
      {
        _id: '1',
        name: 'Puppy',
        age: 2,
        gender: 'female',
      },
      {
        _id: '2',
        name: 'Tomy',
        age: 2,
        gender: 'female',
      },
    ];
    render(
      <NavigationContainer>
        <UserContext.Provider
          value={{
            user: user,
            setUser: mockSetUser,
          }}>
          <Home navigation={{replace: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockPets),
    });

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(`${API_URL}pets/Usha`));
    await waitFor(() => expect(screen.getByText('Milo')).toBeTruthy());
  });
});
