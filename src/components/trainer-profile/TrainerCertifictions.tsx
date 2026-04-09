import certificate from "../../assets/img/certificate.png"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function TrainerCertifictions() {
  return <>
    <div className="container w-10/12 mx-auto pb-6 text-center">
      <h2 className="text-4xl font-bold text-white">Certifications</h2>
      <p className="text-gray-400 my-4">Verified qualifications that demonstrate professional coaching expertise</p>
      <div className="certificate grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

        <Card className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-[#3A3A3A] border">
          <div className="overflow-hidden">
            <img
              src={certificate}
              alt="certificate"
              className="aspect-video w-full object-cover"
            />
          </div>
          <CardHeader className="p-4 space-y-2">
            <CardTitle className="text-white text-base font-semibold leading-snug">
              NASM Certified Personal Trainer
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm leading-relaxed">
              National Academy of Sports Medicine
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-[#3A3A3A] border">
          <div className="overflow-hidden">
            <img
              src={certificate}
              alt="certificate"
              className="aspect-video w-full object-cover"
            />
          </div>
          <CardHeader className="p-4 space-y-2">
            <CardTitle className="text-white text-base font-semibold leading-snug">
              NASM Certified Personal Trainer
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm leading-relaxed">
              National Academy of Sports Medicine
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-[#3A3A3A] border">
          <div className="overflow-hidden">
            <img
              src={certificate}
              alt="certificate"
              className="aspect-video w-full object-cover"
            />
          </div>
          <CardHeader className="p-4 space-y-2">
            <CardTitle className="text-white text-base font-semibold leading-snug">
              NASM Certified Personal Trainer
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm leading-relaxed">
              National Academy of Sports Medicine
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-[#3A3A3A] border">
          <div className="overflow-hidden">
            <img
              src={certificate}
              alt="certificate"
              className="aspect-video w-full object-cover"
            />
          </div>
          <CardHeader className="p-4 space-y-2">
            <CardTitle className="text-white text-base font-semibold leading-snug">
              NASM Certified Personal Trainer
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm leading-relaxed">
              National Academy of Sports Medicine
            </CardDescription>
          </CardHeader>
        </Card>

      </div>
    </div>
  </>
}
