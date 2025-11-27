import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import Project from "./Project"; // Assuming Project component is in ./Project

describe("Project Component", () => {
    // Helper function to render the component once per test
    const renderComponent = () => {
        return render(<Project />);
    };

    test("renders the main 'My Projects' title", () => {
        renderComponent();
        const mainTitle = screen.getByText("My Projects");
        expect(mainTitle).toBeInTheDocument();
    });

    // --- Employee Management System (EMS) Tests ---

    test("renders the Employee Management System project card", () => {
        renderComponent();
        // Check for the project title
        expect(screen.getByText("Employee Management System")).toBeInTheDocument();

        // Check for the project image using alt text
        expect(screen.getByAltText("Employee Management System")).toBeInTheDocument();
        
        // FIX: Use getAllByRole to handle multiple links with the same name,
        // then use .find() to locate the specific EMS link by its unique href.
        const links = screen.getAllByRole('link', { name: "View Project" });
        const emsLink = links.find(link => link.href === "https://adamepaolo98.pythonanywhere.com/");
        
        expect(emsLink).toBeInTheDocument();
        // We check the href for uniqueness again to ensure we found the correct one.
        expect(emsLink).toHaveAttribute("href", "https://adamepaolo98.pythonanywhere.com/");
    });
    
    // --- Book Hive Tests ---

    test("renders the Book Hive project card", () => {
        renderComponent();
        // Check for the project title
        expect(screen.getByText("Book Hive")).toBeInTheDocument();
        
        // Check for the project image using alt text
        expect(screen.getByAltText("Book Hive")).toBeInTheDocument();

        // Check the main link (using a specific link text instance if needed, but checking for the unique href is often better)
        const links = screen.getAllByRole('link', { name: "View Project" });
        // We find the link associated with the correct URL
        const bookHiveLink = links.find(link => link.href === "https://adamepaolo1.pythonanywhere.com/");
        expect(bookHiveLink).toBeInTheDocument();
    });

    // --- Gold Corner Travel and Tours Website Tests ---

    test("renders the Gold Corner Travel and Tours Website project card", () => {
        renderComponent();
        // Check for the project title
        expect(screen.getByText("Gold Corner Travel and Tours Website")).toBeInTheDocument();
        
        // Check for the project image using alt text
        expect(screen.getByAltText("Gold Corner Travel and Tours Website")).toBeInTheDocument();

        // Check the main link
        const links = screen.getAllByRole('link', { name: "View Project" });
        // We find the link associated with the correct URL
        const goldCornerLink = links.find(link => link.href === "https://goldcorner.github.io/");
        expect(goldCornerLink).toBeInTheDocument();
        
        // Check link attributes which are consistent across all links
        expect(goldCornerLink).toHaveAttribute("target", "_blank");
        expect(goldCornerLink).toHaveAttribute("rel", "noopener noreferrer");
    });
});