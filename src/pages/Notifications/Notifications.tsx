import NotificationHead from "@/pages/Notifications/NotificationHead";
import NotificationsPage from "@/pages/Notifications/NotificationsPage";
function Notifications() {
  return (
    <div className="bg-linear-to-b from-[#FF4D4DCC]/15 via-[#FF4D4D]/0.5 to-[#838383]/0.5 px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen ">
      <NotificationHead />
      <NotificationsPage />

    </div>
  )
}

export default Notifications