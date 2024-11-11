import Pet from '../src/components/PetTile';
import Home from '../src/screens/Home/HomeScreen';
import {render, screen} from '@testing-library/react-native';

describe('Test for PEt File', () => {
  const mockPet = {
    _id: '1',
    name: 'Puppy',
    breed:'Puppy2',
    age: 2,
    gender: 'female',
  };
  it('Should render pet image', () => {
    const {getByTestId} = render(<Pet pet={mockPet} />);
    expect(getByTestId('pet-image')).toBeTruthy();
  });
  it("should render pet name",()=>{
    const {getByText} = render(<Pet pet={mockPet}/>)
    expect(getByText("Puppy")).toBeTruthy()
  })
  it("should render pet breed",()=>{
    const {getByText} = render(<Pet pet={mockPet}/>)
    expect(getByText("Puppy2")).toBeTruthy()
  })
});
