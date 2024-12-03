import { render, screen } from "@testing-library/react-native"

// const Loader = require('./../src/screens/Loader/LoaderScreen')
import Loader from "../src/screens/Loader/LoaderScreen"
describe("Test for loader screen",()=>{
    it("should render the background image",()=>{
        render(<Loader/>)
        expect(screen.getByTestId("bg-image")).toBeTruthy()
    })
})