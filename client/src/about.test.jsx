import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import About from "./about";

// Note: This test file does not require Material UI setup (createTheme/ThemeProvider)
// because the About component itself only uses standard HTML/JSX elements.

describe("About Component", () => {
    // Helper function to render the component for cleaner tests
    const renderComponent = () => {
        return render(<About />);
    };

    test("renders the main 'About Me:' header", () => {
        renderComponent();
        const header = screen.getByText("About Me:");
        expect(header).toBeInTheDocument();
    });

    test("renders the user's full name", () => {
        renderComponent();
        const nameElement = screen.getByText("Paolo Andrei Adame");
        // This is within an <h2> element, so checking for its presence is enough.
        expect(nameElement).toBeInTheDocument();
    });

    test("renders the profile image with correct alt text", () => {
        renderComponent();
        // The alt text is 'Paolo Andrei Adame'
        const imageElement = screen.getByAltText("Paolo Andrei Adame");
        expect(imageElement).toBeInTheDocument();
        // You can optionally check the class name if it's critical:
        // expect(imageElement).toHaveClass('about-image');
    });

    test("renders key biographical text (Centennial College)", () => {
        renderComponent();
        const bioText = screen.getByText(
            /I am currently a student at Centennial College/i
        );
        expect(bioText).toBeInTheDocument();
    });

    test("renders the 'Mission Statement:' header", () => {
        renderComponent();
        const missionHeader = screen.getByText("Mission Statement:");
        expect(missionHeader).toBeInTheDocument();
    });

    test("renders the thank you message", () => {
        renderComponent();
        const thankYou = screen.getByText("Thank you for visiting my portfolio!");
        expect(thankYou).toBeInTheDocument();
    });

    test("renders the resume PDF link with correct attributes", () => {
        renderComponent();
        // Look for the link using the text "to the PDF!"
        const resumeLink = screen.getByRole("link", { name: /to the PDF!/i });

        expect(resumeLink).toBeInTheDocument();
        // Check if the link opens in a new tab (target='_blank')
        expect(resumeLink).toHaveAttribute("target", "_blank");
        // Check for the security attribute rel='noopener noreferrer'
        expect(resumeLink).toHaveAttribute("rel", "noopener noreferrer");
    });
});