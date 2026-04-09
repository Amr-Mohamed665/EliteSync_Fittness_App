import FrequentlyAskedSection from "@/components/contact/frequentlyAskedSection";
import GetInTouchSection from "@/components/contact/GetInTouchSection";
import { Toaster } from "react-hot-toast";

function Contact() {
  return (
    <div className="bg-gray-950">
      <div className="py-24 px-6 lg:px-12 mx-auto max-w-7xl space-y-12 ">
        <GetInTouchSection />

        <FrequentlyAskedSection />
        {/* I need to add like a close button so it will close the toast */}
        <Toaster
          position="top-right"
          gutter={8}
          containerStyle={{
            top: "75px",
            right: "50px",
          }}
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "6px",
              background: "linear-gradient(135deg, #1e1e1e 0%, #2e2e2e 100%)",
              color: "#fff",
              border: "1px solid #444",
              padding: "1rem 2rem",
            },
            success: {
              style: {
                borderColor: "#22c55e",
              },
            },
            error: {
              style: {
                background:
                  "linear-gradient(135deg, #1e1e1e 0%, #2e2e2e 85%, #ef4444 100%)",
                borderColor: "#ef4444",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Contact;
