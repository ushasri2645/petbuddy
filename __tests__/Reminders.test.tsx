import { render } from "@testing-library/react-native";
import Reminders from "../src/screens/Reminders/ReminderScreen";

describe("Test for remidners page",()=>{
    it("Should render reminder text",()=>{
        const {getByTestId} = render(<Reminders/>)
        expect(getByTestId("reminder-header")).toBeTruthy()
        expect(getByTestId("+-icon")).toBeTruthy()
    })
})