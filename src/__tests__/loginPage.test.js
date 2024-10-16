import { fireEvent, render, screen } from "@testing-library/react";

import Login from "../pages/Login";
import fetch from "../utilities/fetch";

jest.mock("../utilities/fetch");
jest.mock("react-router-dom");
describe("Login Page", () => {
    test("Renders error if request fails", async () => {

        const login = render(<Login/>);
        const error = {
            error: "invalid username/password"
        }

        fetch.mockRejectedValueOnce(error);

        const submitButton = screen.getByRole("button");

        let errorElement = screen.queryByText(error.error);
        expect(errorElement).toBeFalsy();

        fireEvent.click(submitButton);

        errorElement = screen.queryByText(error.error);
        expect(errorElement).toBeDefined();
    });

    test("Renders success if request succeeds", async () => {
        const login = render(<Login/>);
        const successText = "Successfully Logged In, Returning to homepage in 3 seconds";

        fetch.mockResolvedValueOnce({token: "something", user: {username: "asd", role: "admin"}});

        const submitButton = screen.getByRole("button");

        let successElement = screen.queryByText(successText);
        expect(successElement).toBeFalsy();

        fireEvent.click(submitButton);

        successElement = screen.queryByText(successText);
        expect(successElement).toBeDefined();
    });

    test("Renders form elements for username, password, and submit", () => {
        render(<Login/>);

        const submitButton = screen.getByRole("button");
        const usernameInput = screen.getByLabelText("Username*");
        const passwordInput = screen.getByLabelText("Password*");

        expect(submitButton).toBeDefined();
        expect(usernameInput).toBeDefined();
        expect(passwordInput).toBeDefined();
    });

    test("renders title for page", () => {
        render(<Login/>);

        const title = screen.getByText("Log In");

        expect(title).toBeDefined();
    });
})