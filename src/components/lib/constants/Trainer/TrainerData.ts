interface Trainer {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  specialties: string[];
  location: string;
  bio: string;
  experience: string;
}

export const trainers: Trainer[] = [
  {
    id: "ahmed-mohamed",
    name: "Ahmed Mohamed",
    image: "/trainer.png",
    price: 300,
    rating: 4.8,
    specialties: ["Weight Loss", "Muscle Gain", "General Fitness"],
    location: "Nasr City, Cairo",
    bio: "Helping clients build strength for 8+ years. Ahmed is a certified personal trainer with a passion for transforming lives through fitness. He specializes in weight loss and muscle building programs tailored to individual needs.",
    experience: "8+ years",
  },
  {
    id: "farah-nabil",
    name: "Farah Nabil",
    image: "/trainer.png",
    price: 170,
    rating: 4.6,
    specialties: ["Nutrition", "Weight Loss", "Body Transformation"],
    location: "Zamalek, Cairo",
    bio: "Farah combines nutrition science with effective training methods to deliver lasting results. Her holistic approach to fitness has helped hundreds of clients achieve their dream physique.",
    experience: "5+ years",
  },
  {
    id: "youssef-tarek",
    name: "Youssef Tarek",
    image: "/trainer.png",
    price: 200,
    rating: 4.9,
    specialties: ["Strength", "Muscle Gain", "Functional Training"],
    location: "Zamalek, Cairo",
    bio: "Youssef is known for his intense but rewarding strength training programs. A former competitive athlete, he brings discipline and expertise to every training session.",
    experience: "10+ years",
  },
  {
    id: "yasmin-khaled",
    name: "Yasmin Khaled",
    image: "/trainer.png",
    price: 180,
    rating: 4.7,
    specialties: ["Cardio", "Meditation", "Women's Fitness"],
    location: "Nasr City, Cairo",
    bio: "Yasmin focuses on creating a balanced fitness journey that includes both physical training and mindfulness practices. Her programs are designed specifically for women.",
    experience: "6+ years",
  },
  {
    id: "karim-adel",
    name: "Karim Adel",
    image: "/trainer.png",
    price: 150,
    rating: 4.9,
    specialties: ["HIIT Training", "Muscle Gain", "Body Transformation"],
    location: "Nasr City, Cairo",
    bio: "Karim specializes in high-intensity interval training that delivers maximum results in minimum time. His energetic coaching style keeps clients motivated and on track.",
    experience: "7+ years",
  },
  {
    id: "nour-ahmed",
    name: "Nour Ahmed",
    image: "/trainer.png",
    price: 200,
    rating: 5.0,
    specialties: ["Flexibility", "Endurance", "Women's Fitness"],
    location: "Zamalek, Cairo",
    bio: "Nour brings a unique blend of flexibility training and endurance coaching. She is passionate about helping women discover their inner strength through fitness.",
    experience: "4+ years",
  },
] as const;

export const packages = [
  {
    title: "Single Pack",
    price: "EGP 150",
    duration: "60 MIN",
    sessions: "1 SESSION",
    features: [
      "Try any Trainer",
      "No Commitment",
      "Full Session Access",
      "Post-Workout Plan",
    ],
    isRecommended: false,
  },
  {
    title: "Monthly Pack",
    price: "EGP 1000",
    duration: "60 MIN",
    sessions: "15 SESSIONS",
    features: [
      "Dedicated Trainer",
      "Nutrition Plan Included",
      "Progress Tracking",
      "Priority Scheduling",
    ],
    isRecommended: true,
  },
  {
    title: "Premium Pack",
    price: "EGP 3000",
    duration: "60 MIN",
    sessions: "30 SESSIONS",
    features: [
      "Dedicated Trainer",
      "Full Coaching Program",
      "24/7 Trainer Access",
      "Custom Meal Plans",
    ],
    isRecommended: false,
  },
];

export const testimonials = [
  {
    name: "Sara Mohamed",
    text: "Amazing trainer! Really helped me achieve my fitness goals.",
    rating: 4,
    time: "1 week ago",
  },
  {
    name: "Kareem Omar",
    text: "Professional, knowledgeable, and motivating. Highly recommend!",
    rating: 4,
    time: "2 weeks ago",
  },
  {
    name: "Mariam Ali",
    text: "Best training experience I've ever had. Transformed my routine.",
    rating: 5,
    time: "3 weeks ago",
  },
] as const;

export const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
] as const;
