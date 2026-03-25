import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseCofig";

const sampleEvents = [
  { name: "Tech Conference 2024", location: "San Francisco", date: "2024-05-15", category: "Technology" },
  { name: "Music Festival", location: "Austin", date: "2024-06-10", category: "Entertainment" },
  { name: "Startup Pitch Day", location: "New York", date: "2024-07-20", category: "Business" },
  { name: "Art Exhibition", location: "Chicago", date: "2024-08-05", category: "Art" },
  { name: "AI Workshop", location: "Seattle", date: "2024-09-12", category: "Education" },
  { name: "Gourmet Food Fair", location: "Los Angeles", date: "2024-10-01", category: "Food" },
  { name: "Product Launch", location: "London", date: "2024-11-15", category: "Business" },
  { name: "Wellness Retreat", location: "Bali", date: "2024-12-05", category: "Health" }
];

export const getEventsData = async () => {
    try {
        const eventsCol = collection(db, "events");
        const querySnapshot = await getDocs(eventsCol);
        
        if (querySnapshot.empty) {
            // Seed sample data if empty
            for (const ev of sampleEvents) {
                await addDoc(eventsCol, ev);
            }
            // Re-fetch after seeding
            const newSnapshot = await getDocs(eventsCol);
            return newSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        }

        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error in getEventsData helper:", error);
        throw error;
    }
};
