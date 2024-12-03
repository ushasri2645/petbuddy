describe("Test for URL", () => {
    afterEach(() => {
        jest.resetModules();
    });

    it("should be correct for android", () => {
        jest.doMock("react-native", () => ({
            Platform: { OS: "android" },
        }));
        
        const { API_URL } = require("../API");
        expect(API_URL).toBe(`http://10.0.2.2:5050/api/`);
    });

    it("should be correct for ios", () => {
        jest.doMock("react-native", () => ({
            Platform: { OS: "ios" },
        }));
        
        const { API_URL } = require("../API");
        expect(API_URL).toBe(`http://localhost:5050/api/`);
    });
});
