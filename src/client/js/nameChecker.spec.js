import { checkForName } from "./nameChecker"

describe("nameChecker tests", () => {
    it("Testing the checkForName() function",() =>{
        expect(checkForName).toBeDefined();
    })

    it("Should log Running checkForName",() =>{
        const consoleSpy = jest.spyOn(console, 'log');
        checkForName('testName')
        expect(consoleSpy).toHaveBeenCalledWith('::: Running checkForName :::', "testName");
    })
})