import { render,fireEvent, screen } from '@testing-library/react-native';
import Services from '../src/tabs/Services/ServiceTab';
import {NavigationContainer} from '@react-navigation/native';
import { Alert } from 'react-native';
import { API_URL } from '../API';

global.fetch = jest.fn();
Alert.alert = jest.fn();

const mockServices = {
    "grooming": [
      {
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
      },
    ],
    "boarding": [
      {
        "name": "Standard Boarding",
        "designation": "Boarding Specialist",
        "ratings": 4.3,
        "no_of_reviews": 120,
        "experience": 3,
        "distance":6,
        "min_fee": 40,
        "image_uri":"https://img.freepik.com/free-photo/side-view-owner-with-cute-dog_23-2150238773.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid",
      },
    ],
    "training": [
    {
      "name": "Basic Obedience",
      "designation": "Trainer",
      "ratings": 4.4,
      "no_of_reviews": 90,
      "experience": 3,
      "min_fee": 60,
      "distance":2.5,
      "startDay": "Monday",
      "endDay": "Thursday",
      "startTime": "7:30 A.M",
      "endTime": "3:00 P.M",
      "image_uri":"https://img.freepik.com/free-photo/skater-couple-wearing-trucker-hat_23-2149431216.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    },
  ],
  "veternity": [
    {
      "name": "General Checkup",
      "designation": "Veterinarian",
      "ratings": 4.6,
      "no_of_reviews": 160,
      "experience": 7,
      "distance":1,
      "min_fee": 70,
      "startDay": "Monday",
      "endDay": "Saturday",
      "startTime": "4:30 A.M",
      "endTime": "11:30 P.M",
      "image_uri":"https://img.freepik.com/premium-photo/beautiful-young-female-veterinarian-examining-dog-clinic_255667-9741.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    },
  ]
}
describe('Tests for service Tab', () => {
  it('Should test for heading', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Services/>
      </NavigationContainer>,
    );

    expect(getByText('Hello, How may I help you?')).toBeTruthy()
    expect(getByText('Veternity')).toBeTruthy()
    expect(getByText('Baording')).toBeTruthy()
    expect(getByText('Grooming')).toBeTruthy()
    expect(getByText('Training')).toBeTruthy()

  });
  it('Should test for images', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Services/>
      </NavigationContainer>,
    );

    expect(getByTestId("vaternity-image")).toBeTruthy()
  });

  it("should fetch the data",()=>{
    (fetch as jest.Mock).mockResolvedValue({
      status:200,
      json:()=>[{"veternity":mockServices.veternity}]
    })
    render(
      <NavigationContainer>
        <Services/>
      </NavigationContainer>,
    );

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/services`);
  })
  it("should not fetch the data",()=>{
    (fetch as jest.Mock).mockResolvedValue({
      status:404,
      json:()=>[]
    })
    render(
      <NavigationContainer>
        <Services/>
      </NavigationContainer>,
    );
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/services`);
    expect(Alert.alert).toHaveBeenCalledWith('ERROR FETCHING SERVICES')
  })

  it('should fetch services when collapse is clicked',()=>{
    (fetch as jest.Mock).mockResolvedValue({
      status:200,
      json:()=>[{"veternity":mockServices.veternity}]
    })
    render(
      <NavigationContainer>
        <Services/>
      </NavigationContainer>,
    );
    fireEvent.press(screen.getByText("See all"))
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/services`);
  })
  it('should update the "current" state when a type is clicked', () => {
    render(<Services />);
    const veternityButton = screen.getByTestId('vaternity-image');
    fireEvent.press(veternityButton);
    expect(screen.getByText('Veternity')).toBeTruthy(); 
    const boardingButton = screen.getByText('Baording');
    fireEvent.press(boardingButton);
    expect(screen.getByText('Baording')).toBeTruthy(); 
    const groomingButton = screen.getByText('Grooming');
    fireEvent.press(groomingButton);
    expect(screen.getByText('Grooming')).toBeTruthy(); 
    const trainingButton = screen.getByText('Training');
    fireEvent.press(trainingButton);
    expect(screen.getByText('Training')).toBeTruthy(); 
  });
});
