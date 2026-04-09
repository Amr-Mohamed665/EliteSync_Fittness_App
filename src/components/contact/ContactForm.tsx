import ContactInput from "./ContactInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormSchema,
  type ContactFormType,
} from "@/lib/schemas/ContactFormSchema";
import useContact from "@/hooks/useContact";

const ContactForm = () => {
  const { mutate, isPending, isSuccess } = useContact();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = (data: ContactFormType) => {
    // if success reset form
    mutate(data);
    if (isSuccess) {
      reset();
    }
  };
  const onError = (errors: any) => {
    console.log(errors);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="w-full border border-gray-500 rounded-lg p-6 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ContactInput
          label="Name"
          type="text"
          id="name"
          placeholder="Enter your name"
          register={register("name")}
          error={errors.name?.message}
        />
        <ContactInput
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
          register={register("email")}
          error={errors.email?.message}
        />
      </div>
      <ContactInput
        label="Subject"
        type="text"
        id="subject"
        placeholder="Enter your subject"
        register={register("subject")}
        error={errors.subject?.message}
      />
      <ContactInput
        label="Message"
        id="message"
        placeholder="How Can we Help You?"
        textarea={true}
        register={register("message")}
        error={errors.message?.message}
      />
      <button
        type="submit"
        className="bg-orange w-full py-4 rounded-lg text-white font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange/80 transition-colors mt-4"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
