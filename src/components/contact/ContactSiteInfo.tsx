import { Phone, Mail, Clock } from "lucide-react";

const ContactSiteInfo = () => {
  return (
    <div className="w-full border border-gray-500 rounded-lg px-4 py-6">
      <div className="flex flex-col gap-3">
        {contactInfoData.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 border border-gray-500 rounded-lg px-4 py-4"
          >
            <item.icon className="text-orange w-5 h-5 shrink-0" />
            <div className="flex flex-col items-start gap-1">
              <p className="text-white text-sm font-bold">{item.title}</p>

              {item.value.map((value, index) => (
                <p key={index} className="text-gray-400 text-xs sm:text-sm">
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
    icon: Phone,
    value: ["+1 (555) 123-4567"],
  },
  {
    title: "Email",
    icon: Mail,
    value: ["NFO@gmail.com"],
  },
  {
    title: "Hours",
    icon: Clock,
    value: ["MON-FRI: 6AM - 10PM", "SAT-SUN 8AM-8PM"],
  },
];

export default ContactSiteInfo;
