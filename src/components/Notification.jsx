import { useRecoilState } from "recoil";
import { useState } from "react";
import { notificationState } from "../recoil/RecoilNotification";
import {
  Bell,
  NotificationContainer,
  Sidebar,
  Close,
  Arrow,
} from "../styles/NotificationCSS";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useRecoilState(notificationState);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NotificationContainer>
      <Bell onClick={toggleSidebar} />
      {isOpen && <Sidebar></Sidebar>}
    </NotificationContainer>
  );
};
export default Notification;
