import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // Import toBeInTheDocument
import Note from "./Note";
import NoteForm from "./noteForm";
import noteServices from "../services/blogs";

jest.mock("../services/blogs");

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

    userEvent.click(viewButton);

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
  it("calls createNote with the correct data", async () => {
    const createNote = jest.fn();
    const setNewBlogForm = jest.fn();
    const setBlogs = jest.fn();
    const setNotification = jest.fn();
    const blogs = [];

    // Configure the mock implementation for create function
    noteServices.create.mockImplementation((data) => {
      createNote(data);
      return Promise.resolve(data); // Mock a successful response
    });

    // Render the NoteForm component
    render(
      <NoteForm
        createNote={createNote}
        setNewBlogForm={setNewBlogForm}
        setBlogs={setBlogs}
        setNotification={setNotification}
        user={{ id: 1 }}
        blogs={blogs}
      />
    );

    // Simulate user input
    userEvent.type(screen.getByPlaceholderText("Title"), "Test Blog");
    userEvent.type(screen.getByPlaceholderText("URL"), "https://test.com");
    userEvent.type(screen.getByPlaceholderText("Author"), "Test Author");

    // Click the Save button
    userEvent.click(screen.getByText("save"));

    // Ensure that the createNote function was called with the correct data
    expect(createNote).toHaveBeenCalledTimes(1);
    expect(createNote).toHaveBeenCalledWith({
      title: "Test Blog",
      author: "Test Author",
      url: "https://test.com",
      likes: 0,
    });
  });
});
