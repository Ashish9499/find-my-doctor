export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  room: string;
  floor: string;
  timings: string;
  directions: string;
};

export const specialties = [
  { name: "Cardiologist", icon: "❤️" },
  { name: "Dermatologist", icon: "🧴" },
  { name: "Neurologist", icon: "🧠" },
  { name: "Pediatrician", icon: "👶" },
  { name: "Orthopedic", icon: "🦴" },
  { name: "General Physician", icon: "🩺" },
  { name: "ENT Specialist", icon: "👂" },
  { name: "Ophthalmologist", icon: "👁️" },
];

export const doctors: Doctor[] = [
  { id: "1", name: "Dr. Anita Sharma", specialty: "Cardiologist", room: "204", floor: "2nd Floor", timings: "9:00 AM to 1:00 PM", directions: "Go to 2nd floor, turn left near the lift, third room on the right." },
  { id: "2", name: "Dr. Rajesh Kumar", specialty: "Cardiologist", room: "207", floor: "2nd Floor", timings: "2:00 PM to 6:00 PM", directions: "Go to 2nd floor, turn right after the reception desk." },
  { id: "3", name: "Dr. Priya Menon", specialty: "Dermatologist", room: "105", floor: "1st Floor", timings: "10:00 AM to 2:00 PM", directions: "On the 1st floor, walk straight from the main entrance, last room on the left." },
  { id: "4", name: "Dr. Vikram Singh", specialty: "Neurologist", room: "302", floor: "3rd Floor", timings: "11:00 AM to 4:00 PM", directions: "Take the lift to the 3rd floor, turn left, second room on the right." },
  { id: "5", name: "Dr. Neha Verma", specialty: "Pediatrician", room: "110", floor: "1st Floor", timings: "9:00 AM to 12:00 PM", directions: "1st floor, near the children's play area on the right." },
  { id: "6", name: "Dr. Suresh Patel", specialty: "Orthopedic", room: "215", floor: "2nd Floor", timings: "10:00 AM to 3:00 PM", directions: "2nd floor, turn right from the lift, end of the corridor." },
  { id: "7", name: "Dr. Meera Iyer", specialty: "General Physician", room: "101", floor: "Ground Floor", timings: "8:00 AM to 8:00 PM", directions: "Ground floor, first room next to the reception." },
  { id: "8", name: "Dr. Arjun Reddy", specialty: "ENT Specialist", room: "108", floor: "1st Floor", timings: "11:00 AM to 5:00 PM", directions: "1st floor, second room on the right after the lift." },
  { id: "9", name: "Dr. Kavita Joshi", specialty: "Ophthalmologist", room: "112", floor: "1st Floor", timings: "9:30 AM to 1:30 PM", directions: "1st floor, opposite to the pharmacy counter." },
  { id: "10", name: "Dr. Sanjay Gupta", specialty: "General Physician", room: "102", floor: "Ground Floor", timings: "2:00 PM to 9:00 PM", directions: "Ground floor, second room next to the reception." },
  { id: "11", name: "Dr. Pooja Nair", specialty: "Dermatologist", room: "107", floor: "1st Floor", timings: "3:00 PM to 7:00 PM", directions: "1st floor, turn right from the lift, second door." },
  { id: "12", name: "Dr. Rahul Desai", specialty: "Neurologist", room: "305", floor: "3rd Floor", timings: "9:00 AM to 12:00 PM", directions: "3rd floor, turn right from the lift, end of the hallway." },
];
