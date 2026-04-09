import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import gymbackground from "../../../public/gymbackground.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import "../../index.css"
import { CompleteProfileInfoSchema } from "@/lib/schemas/CompleteProfileInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import rightIcone from "./icones/rigtht.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { SendCompleteProfile } from "@/lib/Api/Authentication/Authentication";
import { AlertCoponant } from "@/components/common/Alart";
import { useEffect } from "react";

function CompleteProfile() {
  const navigate = useNavigate();
  const [loding, setLoding] = useState(false);

  const { register, setValue, handleSubmit, formState } = useForm({
    resolver: zodResolver(CompleteProfileInfoSchema),
  });

  async function Submit(data) {
    setLoding(true);
    try {
      const response = await SendCompleteProfile(data);
      if (response.success) {
        navigate("/");
      } else {
        setalrtEror(response.message);
      }
    } catch (error) {
      setalrtEror("Something went wrong. Please try again.");
    } finally {
      setLoding(false);
    }

  }


  const [alrtEror, setalrtEror] = useState(null);

  useEffect(() => {
    if (alrtEror) {
      const timer = setTimeout(() => {
        setalrtEror(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [alrtEror]);



  return (
    <>
      {(alrtEror) && (
        <AlertCoponant
          isEror={!!alrtEror}
          title={"Failed"}
          text={alrtEror}
        />
      )}
      <div
        style={{ backgroundImage: `url(${gymbackground})` }}
        className="relative w-full flex-col overflow-hidden overflow-x-hidden py-5 min-h-screen flex items-center justify-center bg-center bg-cover before:absolute before:inset-0 before:bg-black/50"
      >
        <form
          className=" overflow-y-auto custom-scroll overflow-x-hidden h-[90vh]  px-5 py-7 z-10 text-white  border border-orange rounded-2xl w-[95%] md:w-[50%] lg:w-[35%]  bg-black/70 shadow-2xl flex flex-col items-center  gap-3"
          onSubmit={handleSubmit(Submit)}
        >
          <h2 className=" text-2xl font-bold text-center">
            Personalize your training experience
          </h2>
          <h2 className=" text-lg text-gray-400 text-center">
            Tell us a few things about your fitness goals so we can recommend the
            best trainers for you.
          </h2>

          <div className=" w-full mt-2 ">
            <h2 className=" mb-1 text-sm font-bold">What is your gender?</h2>
            <RadioGroup onValueChange={(value) => setValue("gender", value)} className={`bg-input p-2 rounded-md border ${formState.errors.gender ? " border-red-400" : " border-transparent"} `}>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="male" id="Male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className=" border-b border-b-gray-200 w-full"></div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className=" w-full mt-2 flex gap-2 ">
            <div className=" w-full">
              <h2 className=" mb-1 text-sm font-bold">your age</h2>
              <Input {...register("age", { valueAsNumber: true })}
                aria-invalid={!!formState.errors.age} placeholder="age " className="  bg-input " min={10} max={80} type="number">
              </Input>
            </div>
            <div className=" w-full">
              <h2 className=" mb-1 text-sm font-bold">your height </h2>
              <Input {...register("height_cm", { valueAsNumber: true })}
                aria-invalid={!!formState.errors.height_cm} placeholder="height / cm" className="  bg-input " min={140} max={210} type="number">
              </Input>
            </div>
            <div className=" w-full">
              <h2 className=" mb-1 text-sm font-bold">your weight </h2>
              <Input {...register("weight_kg", { valueAsNumber: true })}
                aria-invalid={!!formState.errors.weight_kg} placeholder="weight / kg " className="  bg-input " min={40} max={180} type="number">
              </Input>
            </div>

          </div>

          <div className=" w-full mt-2">
            <h2 className=" mb-1 text-sm font-bold">
              What is your current fitness level?
            </h2>
            <RadioGroup onValueChange={(value) => setValue("fitness_level", value)} className={`bg-input p-2 rounded-md border ${formState.errors.fitness_level ? " border-red-400" : " border-transparent"} `}>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="beginner" id="Beginner" />
                <Label htmlFor="Beginner">Beginner</Label>
              </div>
              <div className=" border-b border-b-gray-200 w-full"></div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="intermediate" id="Intermediate" />
                <Label htmlFor="Intermediate">Intermediate</Label>
              </div>
              <div className=" border-b border-b-gray-200 w-full"></div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="advanced" id="Advanced" />
                <Label htmlFor="Advanced">Advanced</Label>
              </div>
            </RadioGroup>
          </div>

          <div className=" w-full mt-2">
            <h2 className=" mb-1 text-sm font-bold">
              How would you like to train?
            </h2>
            <RadioGroup onValueChange={(value) => setValue("workout_location", value)} className={`bg-input p-2 rounded-md border ${formState.errors.workout_location ? " border-red-400" : " border-transparent"} `}>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="in_person_training"
                  id="In-person-training"
                />
                <Label htmlFor="In-person-training">In-person training</Label>
              </div>
              <div className=" border-b border-b-gray-200 w-full"></div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="online" id="Online-training" />
                <Label htmlFor="Online-training">Online training</Label>
              </div>
              <div className=" border-b border-b-gray-200 w-full"></div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="Both" id="Both" />
                <Label htmlFor="Both">Both</Label>
              </div>
            </RadioGroup>
          </div>

          <div className=" w-full mt-2">
            <h2 className=" mb-1 text-sm font-bold">
              How often do you plan to train?
            </h2>
            <RadioGroup onValueChange={(value) => setValue("preferred_training_days", value)} className={`bg-input p-2 rounded-md border ${formState.errors.preferred_training_days ? " border-red-400" : " border-transparent"} `}>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="1-2"
                  id="1-2-times-per-week"
                />
                <Label htmlFor="1-2-times-per-week">1-2 times per week</Label>
              </div>
              <div className=" border-b border-b-gray-200 w-full"></div>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="3-4"
                  id="3-4-times-per-week"
                />
                <Label htmlFor="3-4-times-per-week">3-4 times per week</Label>
              </div>
              <div className=" border-b border-b-gray-200 w-full"></div>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="5+"
                  id="5+ times per week"
                />
                <Label htmlFor="5+ times per week">5+ times per week</Label>
              </div>
            </RadioGroup>
          </div>

          <div className=" w-full mt-2 ">
            <h2 className=" mb-1 text-sm font-bold">
              What is your primary fitness goal?
            </h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className={`bg-input p-2 rounded-md border ${formState.errors.fitness_goal ? " border-red-400" : " border-hidden"} `}>
                  Select your goals!
                </AccordionTrigger>
                <AccordionContent className="bg-input p-2 rounded-md mt-4 ">

                  <RadioGroup onValueChange={(value) => setValue("fitness_goal", value)} className="bg-input p-2 rounded-md" >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="weight_loss"
                        id="weight_loss"
                      />
                      <Label htmlFor="weight_loss">Lose weight</Label>
                    </div>
                    <div className=" border-b border-b-gray-200 w-full"></div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="muscle_gain"
                        id="muscle_gain"
                      />
                      <Label htmlFor="muscle_gain">Build muscle</Label>
                    </div>
                    <div className=" border-b border-b-gray-200 w-full"></div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="general_fitness"
                        id="general_fitness"
                      />
                      <Label htmlFor="general_fitness">Improve general fitness</Label>
                    </div>
                    <div className=" border-b border-b-gray-200 w-full"></div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="strength"
                        id="strength"
                      />
                      <Label htmlFor="strength">Strength training</Label>
                    </div>
                    <div className=" border-b border-b-gray-200 w-full"></div>

                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="flexibility"
                        id="flexibility"
                      />
                      <Label htmlFor="flexibility">Flexibility and mobility</Label>
                    </div>
                    <div className=" border-b border-b-gray-200 w-full"></div>

                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="endurance"
                        id="endurance"
                      />
                      <Label htmlFor="endurance">Stay active</Label>
                    </div>
                    <div className=" border-b border-b-gray-200 w-full"></div>

                  </RadioGroup>


                  <FieldGroup>


                  </FieldGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>


            <Button disabled={loding} type="submit" className=" w-full mt-3 bg-orange">
              {loding ? (
                <Spinner className="size-6" />
              ) : (
                <>
                  Continue <img src={rightIcone} alt="" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CompleteProfile;
