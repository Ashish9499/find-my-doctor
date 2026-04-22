export type Doctor = {
  id: string;
  name: string;
  name_hi: string;
  specialty: string;
  specialty_hi: string;
  room: string;
  floor: string;
  floor_hi: string;
  timings: string;
  timings_hi: string;
  directions: string;
  directions_hi: string;
};

export const specialties = [
  { name: "Cardiologist", name_hi: "हृदय रोग विशेषज्ञ", icon: "❤️" },
  { name: "Dermatologist", name_hi: "त्वचा रोग विशेषज्ञ", icon: "🧴" },
  { name: "Neurologist", name_hi: "तंत्रिका रोग विशेषज्ञ", icon: "🧠" },
  { name: "Pediatrician", name_hi: "बाल रोग विशेषज्ञ", icon: "👶" },
  { name: "Orthopedic", name_hi: "हड्डी रोग विशेषज्ञ", icon: "🦴" },
  { name: "General Physician", name_hi: "सामान्य चिकित्सक", icon: "🩺" },
  { name: "ENT Specialist", name_hi: "कान नाक गला विशेषज्ञ", icon: "👂" },
  { name: "Ophthalmologist", name_hi: "नेत्र रोग विशेषज्ञ", icon: "👁️" },
];

export const doctors: Doctor[] = [
  { id: "1", name: "Dr. Anita Sharma", name_hi: "डॉ. अनीता शर्मा", specialty: "Cardiologist", specialty_hi: "हृदय रोग विशेषज्ञ", room: "204", floor: "2nd Floor", floor_hi: "दूसरी मंजिल", timings: "9:00 AM to 1:00 PM", timings_hi: "सुबह 9 बजे से दोपहर 1 बजे तक", directions: "Go to 2nd floor, turn left near the lift, third room on the right.", directions_hi: "दूसरी मंजिल पर जाएं, लिफ्ट के पास बाईं ओर मुड़ें, दाईं ओर तीसरा कमरा।" },
  { id: "2", name: "Dr. Rajesh Kumar", name_hi: "डॉ. राजेश कुमार", specialty: "Cardiologist", specialty_hi: "हृदय रोग विशेषज्ञ", room: "207", floor: "2nd Floor", floor_hi: "दूसरी मंजिल", timings: "2:00 PM to 6:00 PM", timings_hi: "दोपहर 2 बजे से शाम 6 बजे तक", directions: "Go to 2nd floor, turn right after the reception desk.", directions_hi: "दूसरी मंजिल पर जाएं, रिसेप्शन के बाद दाईं ओर मुड़ें।" },
  { id: "3", name: "Dr. Priya Menon", name_hi: "डॉ. प्रिया मेनन", specialty: "Dermatologist", specialty_hi: "त्वचा रोग विशेषज्ञ", room: "105", floor: "1st Floor", floor_hi: "पहली मंजिल", timings: "10:00 AM to 2:00 PM", timings_hi: "सुबह 10 बजे से दोपहर 2 बजे तक", directions: "On the 1st floor, walk straight from the main entrance, last room on the left.", directions_hi: "पहली मंजिल पर मुख्य द्वार से सीधे चलें, बाईं ओर अंतिम कमरा।" },
  { id: "4", name: "Dr. Vikram Singh", name_hi: "डॉ. विक्रम सिंह", specialty: "Neurologist", specialty_hi: "तंत्रिका रोग विशेषज्ञ", room: "302", floor: "3rd Floor", floor_hi: "तीसरी मंजिल", timings: "11:00 AM to 4:00 PM", timings_hi: "सुबह 11 बजे से शाम 4 बजे तक", directions: "Take the lift to the 3rd floor, turn left, second room on the right.", directions_hi: "लिफ्ट से तीसरी मंजिल पर जाएं, बाईं ओर मुड़ें, दाईं ओर दूसरा कमरा।" },
  { id: "5", name: "Dr. Neha Verma", name_hi: "डॉ. नेहा वर्मा", specialty: "Pediatrician", specialty_hi: "बाल रोग विशेषज्ञ", room: "110", floor: "1st Floor", floor_hi: "पहली मंजिल", timings: "9:00 AM to 12:00 PM", timings_hi: "सुबह 9 बजे से दोपहर 12 बजे तक", directions: "1st floor, near the children's play area on the right.", directions_hi: "पहली मंजिल पर, दाईं ओर बच्चों के खेल क्षेत्र के पास।" },
  { id: "6", name: "Dr. Suresh Patel", name_hi: "डॉ. सुरेश पटेल", specialty: "Orthopedic", specialty_hi: "हड्डी रोग विशेषज्ञ", room: "215", floor: "2nd Floor", floor_hi: "दूसरी मंजिल", timings: "10:00 AM to 3:00 PM", timings_hi: "सुबह 10 बजे से दोपहर 3 बजे तक", directions: "2nd floor, turn right from the lift, end of the corridor.", directions_hi: "दूसरी मंजिल पर, लिफ्ट से दाईं ओर मुड़ें, गलियारे के अंत में।" },
  { id: "7", name: "Dr. Meera Iyer", name_hi: "डॉ. मीरा अय्यर", specialty: "General Physician", specialty_hi: "सामान्य चिकित्सक", room: "101", floor: "Ground Floor", floor_hi: "भूतल", timings: "8:00 AM to 8:00 PM", timings_hi: "सुबह 8 बजे से रात 8 बजे तक", directions: "Ground floor, first room next to the reception.", directions_hi: "भूतल पर, रिसेप्शन के बगल में पहला कमरा।" },
  { id: "8", name: "Dr. Arjun Reddy", name_hi: "डॉ. अर्जुन रेड्डी", specialty: "ENT Specialist", specialty_hi: "कान नाक गला विशेषज्ञ", room: "108", floor: "1st Floor", floor_hi: "पहली मंजिल", timings: "11:00 AM to 5:00 PM", timings_hi: "सुबह 11 बजे से शाम 5 बजे तक", directions: "1st floor, second room on the right after the lift.", directions_hi: "पहली मंजिल पर, लिफ्ट के बाद दाईं ओर दूसरा कमरा।" },
  { id: "9", name: "Dr. Kavita Joshi", name_hi: "डॉ. कविता जोशी", specialty: "Ophthalmologist", specialty_hi: "नेत्र रोग विशेषज्ञ", room: "112", floor: "1st Floor", floor_hi: "पहली मंजिल", timings: "9:30 AM to 1:30 PM", timings_hi: "सुबह 9:30 बजे से दोपहर 1:30 बजे तक", directions: "1st floor, opposite to the pharmacy counter.", directions_hi: "पहली मंजिल पर, फार्मेसी काउंटर के सामने।" },
  { id: "10", name: "Dr. Sanjay Gupta", name_hi: "डॉ. संजय गुप्ता", specialty: "General Physician", specialty_hi: "सामान्य चिकित्सक", room: "102", floor: "Ground Floor", floor_hi: "भूतल", timings: "2:00 PM to 9:00 PM", timings_hi: "दोपहर 2 बजे से रात 9 बजे तक", directions: "Ground floor, second room next to the reception.", directions_hi: "भूतल पर, रिसेप्शन के बगल में दूसरा कमरा।" },
  { id: "11", name: "Dr. Pooja Nair", name_hi: "डॉ. पूजा नायर", specialty: "Dermatologist", specialty_hi: "त्वचा रोग विशेषज्ञ", room: "107", floor: "1st Floor", floor_hi: "पहली मंजिल", timings: "3:00 PM to 7:00 PM", timings_hi: "दोपहर 3 बजे से शाम 7 बजे तक", directions: "1st floor, turn right from the lift, second door.", directions_hi: "पहली मंजिल पर, लिफ्ट से दाईं ओर मुड़ें, दूसरा दरवाजा।" },
  { id: "12", name: "Dr. Rahul Desai", name_hi: "डॉ. राहुल देसाई", specialty: "Neurologist", specialty_hi: "तंत्रिका रोग विशेषज्ञ", room: "305", floor: "3rd Floor", floor_hi: "तीसरी मंजिल", timings: "9:00 AM to 12:00 PM", timings_hi: "सुबह 9 बजे से दोपहर 12 बजे तक", directions: "3rd floor, turn right from the lift, end of the hallway.", directions_hi: "तीसरी मंजिल पर, लिफ्ट से दाईं ओर मुड़ें, गलियारे के अंत में।" },
];

export type MedicalTest = {
  id: string;
  name: string;
  name_hi: string;
  room: string;
  floor: string;
  floor_hi: string;
  timings: string;
  timings_hi: string;
  directions: string;
  directions_hi: string;
  icon: string;
};

export const medicalTests: MedicalTest[] = [
  { id: "t1", name: "Blood Test", name_hi: "रक्त जांच", room: "G05", floor: "Ground Floor", floor_hi: "भूतल", timings: "7:00 AM to 11:00 AM", timings_hi: "सुबह 7 बजे से सुबह 11 बजे तक", directions: "Ground floor, lab section, third door on the left.", directions_hi: "भूतल पर, प्रयोगशाला अनुभाग, बाईं ओर तीसरा दरवाजा।", icon: "🩸" },
  { id: "t2", name: "X-Ray", name_hi: "एक्स-रे", room: "G12", floor: "Ground Floor", floor_hi: "भूतल", timings: "8:00 AM to 6:00 PM", timings_hi: "सुबह 8 बजे से शाम 6 बजे तक", directions: "Ground floor, radiology wing, follow the blue signs.", directions_hi: "भूतल पर, रेडियोलॉजी विंग, नीले संकेतों का पालन करें।", icon: "🦴" },
  { id: "t3", name: "MRI Scan", name_hi: "एमआरआई स्कैन", room: "B02", floor: "Basement", floor_hi: "तहखाना", timings: "9:00 AM to 5:00 PM", timings_hi: "सुबह 9 बजे से शाम 5 बजे तक", directions: "Take the lift to the basement, turn right, MRI suite at the end.", directions_hi: "लिफ्ट से तहखाने में जाएं, दाईं ओर मुड़ें, अंत में एमआरआई कक्ष।", icon: "🧲" },
  { id: "t4", name: "CT Scan", name_hi: "सीटी स्कैन", room: "B05", floor: "Basement", floor_hi: "तहखाना", timings: "9:00 AM to 6:00 PM", timings_hi: "सुबह 9 बजे से शाम 6 बजे तक", directions: "Basement, near the MRI suite, second door on the left.", directions_hi: "तहखाने में, एमआरआई कक्ष के पास, बाईं ओर दूसरा दरवाजा।", icon: "🧠" },
  { id: "t5", name: "Ultrasound", name_hi: "अल्ट्रासाउंड", room: "115", floor: "1st Floor", floor_hi: "पहली मंजिल", timings: "10:00 AM to 4:00 PM", timings_hi: "सुबह 10 बजे से शाम 4 बजे तक", directions: "1st floor, turn left from the lift, fourth room.", directions_hi: "पहली मंजिल पर, लिफ्ट से बाईं ओर मुड़ें, चौथा कमरा।", icon: "👶" },
  { id: "t6", name: "ECG", name_hi: "ईसीजी", room: "210", floor: "2nd Floor", floor_hi: "दूसरी मंजिल", timings: "8:00 AM to 8:00 PM", timings_hi: "सुबह 8 बजे से रात 8 बजे तक", directions: "2nd floor, cardiology wing, first room on the right.", directions_hi: "दूसरी मंजिल पर, हृदय विभाग, दाईं ओर पहला कमरा।", icon: "💓" },
  { id: "t7", name: "Urine Test", name_hi: "मूत्र जांच", room: "G06", floor: "Ground Floor", floor_hi: "भूतल", timings: "7:00 AM to 11:00 AM", timings_hi: "सुबह 7 बजे से सुबह 11 बजे तक", directions: "Ground floor, lab section, next to the blood test room.", directions_hi: "भूतल पर, प्रयोगशाला अनुभाग, रक्त जांच कक्ष के बगल में।", icon: "🧪" },
  { id: "t8", name: "Eye Test", name_hi: "नेत्र जांच", room: "113", floor: "1st Floor", floor_hi: "पहली मंजिल", timings: "9:30 AM to 1:30 PM", timings_hi: "सुबह 9:30 बजे से दोपहर 1:30 बजे तक", directions: "1st floor, next to the ophthalmology clinic.", directions_hi: "पहली मंजिल पर, नेत्र क्लिनिक के बगल में।", icon: "👁️" },
];
