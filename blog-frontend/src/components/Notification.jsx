import "../index.css";

const ErrorNotification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return <div className="add">{notification}</div>;
};

export default ErrorNotification;
