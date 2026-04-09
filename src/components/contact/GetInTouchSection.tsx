import ContactForm from "./ContactForm";
import ContactSiteInfo from "./ContactSiteInfo";

const GetInTouchSection = () => {
  return (
    //  give it backgroudned orange gradient from top to buttom
    <section className="w-full rounded-lg bg-linear-to-b from-[#FF4D4D]/20 to-gray-950 border border-gray-500 py-24 px-6 lg:px-12 ">
      <div className="bg-gray-950 rounded-lg py-12 px-6 space-y-8">
        <div className="space-y-2.5">
          <h2 className="text-4xl font-bold text-white">Get In Touch</h2>
          <p className="text-gray-400 text-2xl capitalize">
            Questions? Issues? whe're here to hel
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <ContactForm />
          <ContactSiteInfo />
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
