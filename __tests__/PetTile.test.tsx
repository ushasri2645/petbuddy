import Pet from '../src/components/PetTile';
import Home from '../src/screens/Home/HomeScreen';
import {fireEvent, render, screen} from '@testing-library/react-native';

describe('Test for PEt File', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };
  const mockPet = {
    _id: '1',
    name: 'Puppy',
    breed:'Puppy2',
    age: 2,
    gender: 'female',
  };
  it('Should render pet image', () => {
    const {getByTestId} = render(<Pet navigation={jest.fn()} pet={mockPet} />);
    expect(getByTestId('pet-image')).toBeTruthy();
  });
  it("should render pet name",()=>{
    const {getByText} = render(<Pet navigation={jest.fn()} pet={mockPet}/>)
    expect(getByText("Puppy")).toBeTruthy()
  })
  it("should render pet breed",()=>{
    const {getByText} = render(<Pet navigation={jest.fn()}pet={mockPet}/>)
    expect(getByText("Puppy2")).toBeTruthy()
  })
  it("should navigaet appropriately",()=>{
    const {getByTestId} = render(<Pet navigation={mockNavigation} pet={mockPet}/>)
    fireEvent.press(getByTestId("pet-details"))
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Pet', {"pet": {"_id": "1", "age": 2, "breed": "Puppy2", "gender": "female", "name": "Puppy"}});
  })



});
