import Tile from "../src/components/Tile";
import { render, screen } from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

describe("Tile file tests",()=>{
    const mockService = {
        "name": "Deluxe Grooming",
        "designation": "Senior Groomer",
        "ratings": 4.5,
        "no_of_reviews": 150,
        "experience": 5,
        "distance":2.4,
        "min_fee": 50,
        "startDay": "Monday",
        "endDay": "Saturday",
        "startTime": "8:00 A.M",
        "endTime": "10.00 P.M",
        "image_uri":"https://img.freepik.com/free-photo/close-up-pet-lifestyle_23-2149180491.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
      }
    it("Should render all the fields of passed service",()=>{
        const {getByText} = render(
            <Tile service={mockService}/>
        )
        expect(getByText("Deluxe Grooming")).toBeTruthy()
        expect(getByText("Senior Groomer")).toBeTruthy()
        expect(getByText("Monday -  Saturday at 8:00 A.M - 10.00 P.M ")).toBeTruthy()
    })

    it('should render the service image',()=>{
        const {getByTestId} = render(
            <Tile service={mockService}/>
        )
        expect(getByTestId("service-image")).toBeTruthy()
    })
})