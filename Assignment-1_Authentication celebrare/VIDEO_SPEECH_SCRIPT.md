# Video Presentation Script (5 Minutes)

**Tip for recording:** Speak confidently, like a junior developer explaining their thought process. Don't rush, and show the codebase clearly when asked.

---

### 1. Introduction & Dashboard Loading (0:00 - 1:00)
*(Screen: Start on the login page, then log in. Show the dashboard loading state.)*

**"Hi, my name is [Your Name], and this is my implementation for Assignment 2. Taking my previous authentication system, I've now integrated it with Firestore and added global state management."**

**"As I log in with Google, watch the dashboard. You'll see a skeleton loading state. This is because we are actively fetching the events data in real-time from our Firebase Firestore database, specifically from the 'events' collection, rather than just using hardcoded local data."**

---

### 2. Live Search Filter Demonstration (1:00 - 1:45)
*(Screen: Show the dashboard with event cards loaded. Start typing in the search bar.)*

**"Once the data loads, it's displayed in this responsive grid. To make it user-friendly, I added a real-time search filter."**

*(Action: Type 'Tech' or 'Music' in the search bar. Delete the text to show all cards returning.)*

**"As you can see, the filtering happens instantly without any page reloads. I'm achieving this by filtering the global events array directly in the Context based on the controlled input of the search bar."**

---

### 3. State Persistence on Page Refresh (1:45 - 2:30)
*(Screen: Click on one of the event cards to highlight it. Then refresh the browser page.)*

**"Another requirement was remembering user interactions. I'm going to click on this [Name of Event] card, which highlights it. Now, I'll refresh the entire page."**

*(Action: Refresh the page)*

**"Notice how the exact same card stays highlighted. To do this, I captured the ID of the clicked card and saved it to the browser's `localStorage`. On initial load, my Context retrieves this ID so the UI can instantly restore the user's last selection."**

---

### 4. Explaining State Unmounting (2:30 - 3:00)
*(Screen: Stay on the dashboard or switch to VS Code showing your Context file)*

**"A key architectural decision here is where the data lives. If I navigate away from this Dashboard component, the component unmounts. But where does the data go?"**

**"Because I've placed the data fetching and storage inside a React Context (`AuthContext`), the data lives high up in the React tree above the routing logic. Even if the Dashboard is completely destroyed and unmounted, the events array and the search state stay securely inside the Context. When we remount the Dashboard, it simply reads the existing data from Context without needing to re-fetch from Firebase!"**

---

### 5. Codebase Walkthrough: Context File (3:00 - 4:00)
*(Screen: Switch to VS Code. Open `src/context/AuthContext.jsx`)*

**"Here is my `AuthContext.jsx` file. I merged the state into a single Context to avoid prop drilling and keep the app 'intern-friendly' and simple."**

**"This Context provides three main things to the whole app:**
1. **Authentication State:** `user`, `login`, and `logout` functions.
2. **Event Data:** The `events` array that is fetched directly using `getDocs` from Firestore, along with the `isEventsLoading` boolean to trigger our skeleton UI.
3. **UI Interaction State:** The `searchQuery` for filtering and the `lastClickedId` logic for card highlighting."

---

### 6. Answering the Screen Share Question (4:00 - 5:00)
*(Screen: Keep `AuthContext.jsx` and `main.jsx` open to point at code if needed)*

**"To answer the evaluation question: *What happens between the user logging in and the event cards appearing on screen?*"**

**"Step by step:**
1. **First,** the user clicks login, triggering Firebase's `signInWithPopup`.
2. **Second,** our `onAuthStateChanged` listener in the Context detects the successful login, extracts the user token, and updates the `user` state, which flips our `ProtectedRoute` to let the user see the Dashboard.
3. **Third,** at the exact same time when the Context mounts, a `useEffect` triggers our helper function to call Firebase Firestore (`collection('events')`).
4. **Fourth,** while the network request is pending, `isEventsLoading` is true, so our `EventGrid` component renders the Skeleton Loaders.
5. **Finally,** the Firestore data returns. Context updates the `events` array, `isEventsLoading` becomes false, React re-renders, and the actual beautiful Event Cards replace the skeletons on the screen."

**"And that wraps up my demonstration. Thank you!"**
