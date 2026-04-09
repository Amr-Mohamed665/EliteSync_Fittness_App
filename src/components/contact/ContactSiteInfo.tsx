import { Phone, Mail, Clock } from "lucide-react";

const ContactSiteInfo = () => {
  return (
    <div className="w-full border border-gray-500 rounded-lg px-4 py-8">
      <div className="flex flex-col gap-4">
        {contactInfoData.map((item, index) => (
          <div
            key={index}
            className="flex  items-start gap-4 border border-gray-500 rounded-lg px-4 py-6"
          >
            {item.icon}
            <div className="flex flex-col items-start gap-2">
              <p className="text-white font-bold">{item.title}</p>

              {item.value.map((value, index) => (
                <p key={index} className="text-gray-400">
                  {value}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const contactInfoData = [
  {
    title: "Phone",
    icon: <Phone className="text-orange" />,
    value: ["+1 (555) 123-4567"],
  },
  {
    title: "Email",
    icon: <Mail className="text-orange" />,
    value: ["INFO@gmail.com"],
  },
  {
    title: "Hours",
    icon: <Clock className="text-orange" />,
    value: ["MON-FRI: 6AM - 10PM", "SAT-SUN 8AM-8PM"],
  },
];

export default ContactSiteInfo;
