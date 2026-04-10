import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPersonalInfor } from "@/lib/Api/Authentication/profile";
export default function PersonalInfor() {
  const [form, setForm] = useState<any>({});
  const inputs = [
    ["fullName", "Full Name"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["dob", "Date of Birth"],
    ["gender", "Gender"],
    ["location", "Location"],
  ];
  const { data, isLoading } = useQuery({
    queryKey: ["profile-personal-info"],
    queryFn: getPersonalInfor,
  });
  useEffect(() => {
    if (data) {
      setForm({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        location: data.location,
      });
    }
  }, [data]);

  return (
    <>
      <div className="  px-4 md:px-8 mt-10">
        <h1 className="text-3xl mb-10 font-semibold">Personal Information</h1>
        <div className=" border border-[#A7A7A7] p-4 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputs.map(([name, label]) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-[#A7A7A7] mb-2">
                  {label}
                </label>
                <input
                  className="bg-[#2D2D2D] p-2 mb-1 rounded text-[#A7A7A7] w-full"
                  value={form[name as keyof typeof form]}
                  onChange={(e) =>
                    setForm({ ...form, [name]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
          <button className="bg-[#FF4D4D] mt-4 w-full md:w-1/2 py-3 rounded block mx-auto text-[#FFFFFF] font-semibold text-sm hover:bg-black border border-[#FF4D4D] transition">
            Save Changes {data?.personalInfo}
          </button>
        </div>
      </div>
    </>
  );
}