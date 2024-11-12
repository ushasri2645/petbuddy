import AddPetModal from "../src/components/AddPetModal";
import { fireEvent, render } from "@testing-library/react-native";

describe("Test for Modal",()=>{
    it('Should render all the text inputs',()=>{
        const {getByPlaceholderText} = render(
            <AddPetModal visible={true} closeFn={jest.fn()} username="Usha"/>
        );
        expect(getByPlaceholderText("Pet Name")).toBeTruthy()
        expect(getByPlaceholderText("Breed")).toBeTruthy()
        expect(getByPlaceholderText("Age")).toBeTruthy()
        expect(getByPlaceholderText("Height")).toBeTruthy()
        expect(getByPlaceholderText("Weight")).toBeTruthy()
        expect(getByPlaceholderText("Colour")).toBeTruthy()
        expect(getByPlaceholderText("Remarks(Optional)")).toBeTruthy()
    })
    it('should get responsed to username change events',()=>{
        const {getByTestId} = render(
            <AddPetModal visible={true} closeFn={jest.fn()} username="Usha"/>
        );
        const userNameInput = getByTestId("name-input")
        fireEvent.changeText(userNameInput,"Puppy");
        expect(userNameInput.props.value).toBe("Puppy")

    })
    it('should get responsed to breed change events',()=>{
        const {getByTestId} = render(
            <AddPetModal visible={true} closeFn={jest.fn()} username="Usha"/>
        );
        const breedInput = getByTestId("breed-input")
        fireEvent.changeText(breedInput,"Breed1");
        expect(breedInput.props.value).toBe("Breed1")
    })
    it('should get responsed to age change events',()=>{
        const {getByTestId} = render(
            <AddPetModal visible={true} closeFn={jest.fn()} username="Usha"/>
        );
        const ageInput = getByTestId("age-input")
        fireEvent.changeText(ageInput,"2");
        expect(ageInput.props.value).toBe("2")
    })
    it('should get responsed to Height change events',()=>{
        const {getByTestId} = render(
            <AddPetModal visible={true} closeFn={jest.fn()} username="Usha"/>
        );
        const heightInput = getByTestId("height-input")
        fireEvent.changeText(heightInput,"2");
        expect(heightInput.props.value).toBe("2")
    })
    it('should get responsed to weight change events',()=>{
        const {getByTestId} = render(
            <AddPetModal visible={true} closeFn={jest.fn()} username="Usha"/>
        );
        const weightInput = getByTestId("weight-input")
        fireEvent.changeText(weightInput,"3");
        expect(weightInput.props.value).toBe("3")
    })
    it('should get responsed to color change events',()=>{
        const {getByTestId} = render(
            <AddPetModal visible={true} closeFn={jest.fn()} username="Usha"/>
        );
        const colorInput = getByTestId("color-input")
        fireEvent.changeText(colorInput,"red");
        expect(colorInput.props.value).toBe("red")
    })
    it('should get responsed to remarks change events',()=>{
        const {getByTestId} = render(
            <AddPetModal visible={true} closeFn={jest.fn()} username="Usha"/>
        );
        const remarksInput = getByTestId("remarks-input")
        fireEvent.changeText(remarksInput,"HI");
        expect(remarksInput.props.value).toBe("HI")
    })
    it('should get responsed to gender change events',()=>{
        const {getByTestId,getByText} = render(
            <AddPetModal visible={true} closeFn={jest.fn()} username="Usha"/>
        );
        const genderInput = getByTestId("gender-input-Male")
        expect(genderInput).toBeTruthy();
        fireEvent.press(genderInput);
    })
    
    
})