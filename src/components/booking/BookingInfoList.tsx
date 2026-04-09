import type { BookingDetails } from "./BookingConfirmed";

const BookingInfoList = ({ details }: { details: BookingDetails }) => {
  const bookingInfo = [
    { title: "Booking ID", value: details.booking_id || "N/A" },
    { title: "Trainer", value: details.trainerName || "N/A" },
    { title: "Package", value: details.packageTitle || "N/A" },
    { title: "Date", value: details.date || "N/A" },
    { title: "Time", value: details.time || "N/A" },
  ];

  return (
    <ul className="w-full flex flex-col items-start gap-3 text-sm">
      {bookingInfo.map((item, idx) => (
        item.value !== "N/A" && (
          <li key={idx} className="w-full flex items-center justify-between">
            <h3 className="text-[#9b9b9b]">{item.title}</h3>
            <p className="font-bold">{item.value}</p>
          </li>
        )
      ))}
    </ul>
  );
};

export default BookingInfoList;
