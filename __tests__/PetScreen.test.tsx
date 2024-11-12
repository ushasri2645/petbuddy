import PetScreen from "../src/screens/PetScreen/PetScreen";
import { fireEvent, render } from "@testing-library/react-native";

describe("Pet Screen Tests",()=>{
    const mockNavigation = { goBack: jest.fn(), setOptions: jest.fn() };
    const mockRoute = { params: { pet: { name: 'Buddy', age: 3, weight: 15, height: 50, color: 'Brown', remarks: 'Friendly dog' } } };

    it("should render all pet details correctly",()=>{
        const {getByText,getByTestId} = render(<PetScreen  navigation={mockNavigation} route={mockRoute} />)
        expect(getByText("Buddy")).toBeTruthy()
        expect(getByText("Age")).toBeTruthy()
        expect(getByText("Height")).toBeTruthy()
        expect(getByText("Weight")).toBeTruthy()
        expect(getByText("Color")).toBeTruthy()
        expect(getByText("Remarks")).toBeTruthy()
        expect(getByText("Gallery  >")).toBeTruthy()
        expect(getByText("Track")).toBeTruthy()
        expect(getByTestId("dog-image")).toBeTruthy()
    })
})


describe('PetScreen Layout', () => {
    const mockNavigation = {
      goBack: jest.fn(),
      setOptions: jest.fn(),
    };
  
    const mockRoute = {
      params: { pet: { name: 'Buddy', breed: 'Labrador', gender: 'Male', age: 3, weight: 20, height: 50, color: 'Brown', remarks: 'Very playful!' } },
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should set navigation options with custom back button on mount', () => {
      render(<PetScreen navigation={mockNavigation} route={mockRoute} />);
      expect(mockNavigation.setOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          headerShown: true,
          headerTitle: '',
        })
      );
      const headerLeft = mockNavigation.setOptions.mock.calls[0][0].headerLeft;
      expect(typeof headerLeft).toBe('function');
    });

    it('should set the navigation header with a custom back button', () => {
        render(<PetScreen navigation={mockNavigation} route={mockRoute} />);
        expect(mockNavigation.setOptions).toHaveBeenCalledWith(
          expect.objectContaining({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerLeft: expect.any(Function),
          })
        );
        const { headerLeft } = mockNavigation.setOptions.mock.calls[0][0];
        const { getByTestId } = render(headerLeft());
        expect(getByTestId('back-button')).toBeTruthy();
        fireEvent.press(getByTestId('back-button'));
        expect(mockNavigation.goBack).toHaveBeenCalled();
      });
  });