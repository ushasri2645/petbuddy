import { render } from "@testing-library/react-native";
import Reminders from "../src/screens/Reminders/ReminderScreen";

describe("Test for remidners page",()=>{
    const mockRoute = { params: { pet: { name: 'Buddy', age: 3, weight: 15, height: 50, color: 'Brown', remarks: 'Friendly dog' } } };

    it("Should render reminder text",()=>{
        const {getByTestId} = render(<Reminders route={mockRoute} />)
        expect(getByTestId("reminder-header")).toBeTruthy()
        expect(getByTestId("+-icon")).toBeTruthy()
    })
})