import { useState } from "react";

const Note = ({ note }) => {
  const [showAll, setShowAll] = useState(false);
  const [buttonName, setButtonName] = useState("View");

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  };

  const handleView = () => {
    if (buttonName === "View") {
      setShowAll(true);
      setButtonName("Hide");
    } else {
      setShowAll(false);
      setButtonName("View");
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        <p>{`${note.title} By: ${note.author}`}</p>
        <button onClick={() => handleView()}>{buttonName}</button>
      </div>
      {showAll && (
        <div>
          <p>{`URL: ${note.url}`}</p>
          <p>{`Likes: ${note.likes}`}</p>
          <p>{`User: ${note.user.username}`}</p>
        </div>
      )}
    </div>
  );
};

export default Note;
