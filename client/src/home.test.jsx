import React from "react";
// 1. Import createTheme and ThemeProvider from Material UI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import Home from "./home";

// We keep the theme logic in case you re-introduce Material UI later,
// but for now, it's not strictly necessary for testing the simple component.
describe("Home Component", () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#1976d2",
            },
        },
        custom: {
            openTitle: "#ff5722",
        },
    });

    // ThemeProvider is necessary to avoid errors if the component relies on it.
    const renderWithTheme = (ui) => {
        return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
    };

    // --- UPDATED TESTS TO MATCH YOUR CURRENT HOME.JSX CONTENT ---

    test("renders the 'Homepage' title", () => {
        renderWithTheme(<Home />);
        // Find the 'Homepage' text element
        const headerElement = screen.getByText("Homepage");
        expect(headerElement).toBeInTheDocument();
        // You can check if it has the 'header' class if needed:
        // expect(headerElement).toHaveClass('header');
    });

    test("renders the welcome paragraph text", () => {
        renderWithTheme(<Home />);
        // Find the specific welcome text that exists in the component
        const welcomeText = screen.getByText("Welcome to my portfolio website!");
        expect(welcomeText).toBeInTheDocument();
    });

    test("renders the details paragraph text", () => {
        renderWithTheme(<Home />);
        // Find the specific details text
        const detailsText = screen.getByText(
            "Here, you can find information about me, my skills, and some of the projects I've worked on."
        );
        expect(detailsText).toBeInTheDocument();
    });

    test("renders the exploration prompt", () => {
        renderWithTheme(<Home />);
        // Find the specific call to action text
        const exploreText = screen.getByText(
            "Feel free to explore and learn more about my journey in web development!"
        );
        expect(exploreText).toBeInTheDocument();
    });

    // NOTE: The previous tests for 'UnicornBike' and 'Get Started' were removed
    // because those elements do not exist in your current Home.jsx file.
});