import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { clearNotification } from "../reducers/NotificationReducer";

const ErrorNotification = () => {
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);
  if (notification === "") {
    return null;
  }

  setTimeout(() => {
    dispatch(clearNotification());
  }, 3000);

  return <div className="add">{notification}</div>;
};

export default ErrorNotification;
