import { fireEvent, render, screen } from "@testing-library/react";

import Post from "../pages/Post";
import fetch from "../utilities/fetch";

jest.mock("../utilities/fetch");
jest.mock("react-router-dom");
describe("Post Page", () => {
    test("Renders error if request fails", async () => {

        render(<Post/>);
        const error = {
            error: "invalid score"
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
        render(<Post/>);
        const successText = "Created Post. Navigating to post in 3 seconds";

        fetch.mockResolvedValueOnce({message: "something", post: {itemID: "something"}});

        const submitButton = screen.getByRole("button");

        let successElement = screen.queryByText(successText);
        expect(successElement).toBeFalsy();

        fireEvent.click(submitButton);

        successElement = screen.queryByText(successText);
        expect(successElement).toBeDefined();
    });

    test("Renders form elements for title, score, description, tags, and submit", () => {
        render(<Post/>);

        const submitButton = screen.getByRole("button");
        const titleInput = screen.getByLabelText("Title*");
        const scoreInput = screen.getByLabelText("Review Score*");
        const descriptionInput = screen.getByLabelText("Description*")
        const tagsInput = screen.getByLabelText("Tags");


        expect(submitButton).toBeDefined();
        expect(titleInput).toBeDefined();
        expect(scoreInput).toBeDefined();
        expect(descriptionInput).toBeDefined();
        expect(tagsInput).toBeDefined();
    });

    test("Form elements for title, score, description are required", () => {
        render(<Post/>);

        const titleInput = screen.getByLabelText("Title*");
        const scoreInput = screen.getByLabelText("Review Score*");
        const descriptionInput = screen.getByLabelText("Description*")

        expect(titleInput).toHaveAttribute("required");
        expect(scoreInput).toHaveAttribute("required");
        expect(descriptionInput).toHaveAttribute("required");
    });

    test("Score input must be numeric", () => {
        render(<Post/>);

        const scoreInput = screen.getByLabelText("Review Score*");

        expect(scoreInput).toHaveAttribute("inputmode", "numeric");
    })

    test("renders title for page", () => {
        render(<Post/>);

        const title = screen.getByText("Create a Post");

        expect(title).toBeDefined();
    });
})