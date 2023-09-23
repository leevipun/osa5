const Note = ({ note }) => {
  return (
    <div>
      <p>{`${note.title} By: ${note.author}`}</p>
    </div>
  );
};

export default Note;
