import {Alert} from 'react-native';
import {API_URL} from '../API';
import AddPetModal from '../src/components/AddPetModal';
import {fireEvent, render, waitFor} from '@testing-library/react-native';

describe('Test for Modal', () => {
  it('Should render all the text inputs', () => {
    const {getByPlaceholderText} = render(
      <AddPetModal visible={true} closeFn={jest.fn()} username="Usha" />,
    );
    expect(getByPlaceholderText('Pet Name')).toBeTruthy();
    expect(getByPlaceholderText('Breed')).toBeTruthy();
    expect(getByPlaceholderText('Age')).toBeTruthy();
    expect(getByPlaceholderText('Height')).toBeTruthy();
    expect(getByPlaceholderText('Weight')).toBeTruthy();
    expect(getByPlaceholderText('Colour')).toBeTruthy();
    expect(getByPlaceholderText('Remarks(Optional)')).toBeTruthy();
  });
  it('should get responsed to username change events', () => {
    const {getByTestId} = render(
      <AddPetModal visible={true} closeFn={jest.fn()} username="Usha" />,
    );
    const userNameInput = getByTestId('name-input');
    fireEvent.changeText(userNameInput, 'Puppy');
    expect(userNameInput.props.value).toBe('Puppy');
  });
  it('should get responsed to breed change events', () => {
    const {getByTestId} = render(
      <AddPetModal visible={true} closeFn={jest.fn()} username="Usha" />,
    );
    const breedInput = getByTestId('breed-input');
    fireEvent.changeText(breedInput, 'Breed1');
    expect(breedInput.props.value).toBe('Breed1');
  });
  it('should get responsed to age change events', () => {
    const {getByTestId} = render(
      <AddPetModal visible={true} closeFn={jest.fn()} username="Usha" />,
    );
    const ageInput = getByTestId('age-input');
    fireEvent.changeText(ageInput, '2');
    expect(ageInput.props.value).toBe('2');
  });
  it('should get responsed to Height change events', () => {
    const {getByTestId} = render(
      <AddPetModal visible={true} closeFn={jest.fn()} username="Usha" />,
    );
    const heightInput = getByTestId('height-input');
    fireEvent.changeText(heightInput, '2');
    expect(heightInput.props.value).toBe('2');
  });
  it('should get responsed to weight change events', () => {
    const {getByTestId} = render(
      <AddPetModal visible={true} closeFn={jest.fn()} username="Usha" />,
    );
    const weightInput = getByTestId('weight-input');
    fireEvent.changeText(weightInput, '3');
    expect(weightInput.props.value).toBe('3');
  });
  it('should get responsed to color change events', () => {
    const {getByTestId} = render(
      <AddPetModal visible={true} closeFn={jest.fn()} username="Usha" />,
    );
    const colorInput = getByTestId('color-input');
    fireEvent.changeText(colorInput, 'red');
    expect(colorInput.props.value).toBe('red');
  });
  it('should get responsed to remarks change events', () => {
    const {getByTestId} = render(
      <AddPetModal visible={true} closeFn={jest.fn()} username="Usha" />,
    );
    const remarksInput = getByTestId('remarks-input');
    fireEvent.changeText(remarksInput, 'HI');
    expect(remarksInput.props.value).toBe('HI');
  });
  it('should get responsed to gender change events', () => {
    const {getByTestId, getByText} = render(
      <AddPetModal visible={true} closeFn={jest.fn()} username="Usha" />,
    );
    const genderInput = getByTestId('gender-input-Male');
    expect(genderInput).toBeTruthy();
    fireEvent.press(genderInput);
    expect(getByText('Add pet')).toBeTruthy();
  });
});

describe('Test for inserting data', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    Alert.alert = jest.fn();
  });
  it('Should insert the data', async () => {
    const mockPet = {
      name: 'Puppy',
      breed: 'Puppy2',
      gender: 'Male',
      age: '2',
      weight: '10',
      height: '10',
      color: 'red',
      remarks: 'Hello',
    };
    (fetch as jest.Mock).mockResolvedValue({
      status: 201,
    });
    const closeFn = jest.fn();
    const {getByPlaceholderText, getByTestId} = render(
      <AddPetModal visible={true} closeFn={closeFn} username="Usha" />,
    );
    fireEvent.changeText(getByPlaceholderText('Pet Name'), mockPet.name);
    fireEvent.changeText(getByPlaceholderText('Breed'), mockPet.breed);
    fireEvent.changeText(getByPlaceholderText('Age'), mockPet.age);
    fireEvent.changeText(getByPlaceholderText('Height'), mockPet.height);
    fireEvent.changeText(getByPlaceholderText('Weight'), mockPet.weight);
    fireEvent.changeText(getByPlaceholderText('Colour'), mockPet.color);
    fireEvent.changeText(
      getByPlaceholderText('Remarks(Optional)'),
      mockPet.remarks,
    );
    const genderInput = getByTestId('gender-input-Male');
    expect(genderInput).toBeTruthy();
    fireEvent.press(genderInput);

    const addPetInput = getByTestId('add-pet');
    fireEvent.press(addPetInput);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`${API_URL}pets/Usha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockPet),
      });
    });
    await waitFor(()=>{
        expect(closeFn).toHaveBeenCalled()
    })
    expect(Alert.alert).toHaveBeenCalledWith('Pet added succesfully');
  });
  it('Should show user not found while inserting the data', async () => {
    const mockPet = {
      name: 'Puppy',
      breed: 'Puppy2',
      gender: 'Male',
      age: '2',
      weight: '10',
      height: '10',
      color: 'red',
      remarks: 'Hello',
    };
    (fetch as jest.Mock).mockResolvedValue({
      status: 404,
    });
    const {getByPlaceholderText, getByTestId} = render(
      <AddPetModal visible={true} closeFn={jest.fn()} username="usha" />,
    );
    fireEvent.changeText(getByPlaceholderText('Pet Name'), mockPet.name);
    fireEvent.changeText(getByPlaceholderText('Breed'), mockPet.breed);
    fireEvent.changeText(getByPlaceholderText('Age'), mockPet.age);
    fireEvent.changeText(getByPlaceholderText('Height'), mockPet.height);
    fireEvent.changeText(getByPlaceholderText('Weight'), mockPet.weight);
    fireEvent.changeText(getByPlaceholderText('Colour'), mockPet.color);
    fireEvent.changeText(
      getByPlaceholderText('Remarks(Optional)'),
      mockPet.remarks,
    );
    const genderInput = getByTestId('gender-input-Male');
    expect(genderInput).toBeTruthy();
    fireEvent.press(genderInput);

    const addPetInput = getByTestId('add-pet');
    fireEvent.press(addPetInput);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`${API_URL}pets/usha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockPet),
      });
    });
    await waitFor(()=>{
        expect(Alert.alert).toHaveBeenCalledWith("User Not Found")
    })
  });

  it('Should show uthrow error whilee inserting the data', async () => {
    const mockPet = {
      name: 'Puppy',
      breed: 'Puppy2',
      gender: 'Male',
      age: '2',
      weight: '10',
      height: '10',
      color: 'red',
      remarks: 'Hello',
    };
    (fetch as jest.Mock).mockRejectedValue(new Error("Data base error"));
    const {getByPlaceholderText, getByTestId} = render(
      <AddPetModal visible={true} closeFn={jest.fn()} username="usha" />,
    );
    fireEvent.changeText(getByPlaceholderText('Pet Name'), mockPet.name);
    fireEvent.changeText(getByPlaceholderText('Breed'), mockPet.breed);
    fireEvent.changeText(getByPlaceholderText('Age'), mockPet.age);
    fireEvent.changeText(getByPlaceholderText('Height'), mockPet.height);
    fireEvent.changeText(getByPlaceholderText('Weight'), mockPet.weight);
    fireEvent.changeText(getByPlaceholderText('Colour'), mockPet.color);
    fireEvent.changeText(
      getByPlaceholderText('Remarks(Optional)'),
      mockPet.remarks,
    );
    const genderInput = getByTestId('gender-input-Male');
    expect(genderInput).toBeTruthy();
    fireEvent.press(genderInput);

    const addPetInput = getByTestId('add-pet');
    fireEvent.press(addPetInput);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`${API_URL}pets/usha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockPet),
      });
    });
    await waitFor(()=>{
        expect(Alert.alert).toHaveBeenCalledWith("Error: Data base error")
    })
  });
});
