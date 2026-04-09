import * as zod from "zod";

export const CompleteProfileInfoSchema = zod
    .object({
        gender : zod.string().nonempty("gender is required"),
        age : zod.int().max(80 , "max age is 80").min(10 , "min age is 10") ,
        height_cm : zod.int().max(210 , "max height is 140").min(10 , "min height is 10") ,
        weight_kg : zod.int().max(180 , "max weight is 40").min(10 , "min weight is 10") ,
        fitness_goal : zod.string().nonempty("fitness goal is required"),
        fitness_level : zod.string().nonempty("fitness level is required"),
        workout_location : zod.string().nonempty("workout location is required"),
        preferred_training_days : zod.string().nonempty("preferred training days is required"),
    })