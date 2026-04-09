import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const frequentlyAskedData = [
  {
    id: 1,
    question: "How Do I Cancel A booking",
    answer:
      "To cancel a booking, please log in to your account and navigate to the 'My Bookings' section. From there, you can select the booking you wish to cancel and follow the cancellation instructions. Please note that cancellations are subject to our cancellation policy, which may include fees depending on the timing of the cancellation.",
  },
  {
    id: 2,
    question: "What is your Refund Policy?",
    answer:
      "Our refund policy states that refunds are processed within 5-7 business days for cancellations made within 30 days of the booking date. For cancellations made after 30 days, a partial refund may be issued depending on the circumstances.",
  },
  {
    id: 3,
    question: "Can I change my trainer?",
    answer:
      "Yes, you can change your trainer by logging into your account and navigating to the 'My Bookings' section. From there, you can select the booking you wish to change and follow the instructions to select a new trainer. Please note that changes are subject to availability and may be subject to a fee.",
  },
  {
    id: 4,
    question: "Do you offer Online sessions",
    answer:
      "Yes, we offer online sessions. You can select the online session option when booking your appointment.",
  },
];

const FrequentlyAskedSection = () => {
  return (
    <section className="flex flex-col gap-8 items-stretch w-full">
      <h2 className="text-2xl font-bold text-center text-[#A7A7A7]">
        Frequently Asked
      </h2>
      <Accordion
        type="single"
        collapsible
        defaultValue="shipping"
        className="w-full bg-[#2D2D2D]  rounded-md"
      >
        {frequentlyAskedData.map((item) => (
          <AccordionItem key={item.id} value={item.id.toString()}>
            <AccordionTrigger className="text-md  md:text-xl  font-light px-4 text-[#9CA3AF] hover:text-orange hover:no-underline cursor-pointer">
              {item.question.toUpperCase()}
            </AccordionTrigger>
            <AccordionContent className="px-4 text-md  md:text-lg text-gray-300">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FrequentlyAskedSection;
