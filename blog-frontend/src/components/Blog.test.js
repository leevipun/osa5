import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // Import toBeInTheDocument

import Note from "./Note";

describe("Note Component", () => {
  const sampleNote = {
    title: "Sample Title",
    author: "Sample Author",
    url: "https://example.com",
    likes: 10,
    user: {
      id: 1,
      username: "sampleuser",
    },
  };

  const sampleBlogs = [];
  const setSampleBlogs = jest.fn();
  const sampleUser = {
    id: 1,
  };

  it("renders Note component with title", () => {
    render(
      <Note
        note={sampleNote}
        blogs={sampleBlogs}
        setBlogs={setSampleBlogs}
        user={sampleUser}
      />
    );

    // Assert that the text is present in the component
    expect(
      screen.getByText("Sample Title By: Sample Author")
    ).toBeInTheDocument();
  });

  it("renders Note component with 'View' button", () => {
    render(
      <Note
        note={sampleNote}
        blogs={sampleBlogs}
        setBlogs={setSampleBlogs}
        user={sampleUser}
      />
    );

    // Check that the 'View' button is rendered by default
    expect(screen.getByText("View")).toBeInTheDocument();
  });

  it("renders expanded content when 'View' button is clicked", () => {
    render(
      <Note
        note={sampleNote}
        blogs={sampleBlogs}
        setBlogs={setSampleBlogs}
        user={sampleUser}
      />
    );

    const viewButton = screen.getByText("View");

    // Click the 'View' button
    userEvent.click(viewButton);

    // Check that the expanded content is rendered
    expect(screen.getByText(`URL: ${sampleNote.url}`)).toBeInTheDocument();
    expect(screen.getByText(`Likes: ${sampleNote.likes}`)).toBeInTheDocument();
    expect(
      screen.getByText(`User: ${sampleNote.user.username}`)
    ).toBeInTheDocument();

    // Check that the 'Like' and 'Delete' buttons are present
    expect(screen.getByText("Like")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("toggles between 'View' and 'Hide' button text when clicked", () => {
    render(
      <Note
        note={sampleNote}
        blogs={sampleBlogs}
        setBlogs={setSampleBlogs}
        user={sampleUser}
      />
    );

    const viewButton = screen.getByText("View");

    // Click the 'View' button and check that the text changes to 'Hide'
    userEvent.click(viewButton);
    expect(screen.getByText("Hide")).toBeInTheDocument();

    // Click the 'Hide' button and check that the text changes back to 'View'
    userEvent.click(screen.getByText("Hide"));
    expect(screen.getByText("View")).toBeInTheDocument();
  });
});
