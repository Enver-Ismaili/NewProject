import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, seteditMode] = useState(false);

  useEffect(() => {
    //fetch data from API 
    // fetch('https://localhost:5001/api/activities')
    //   .then(response => response.json())
    //   .then(data => setActivities(data))

    //fetch data using axios
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
    return () => { }
  }, [])

  const handleSelectActivity = (id: string) => {
    setselectedActivity(activities.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setselectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    seteditMode(true);
  }

  const handleFormClose = () => {
    seteditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setActivities(activities.map(x => x.id === activity.id ? activity : x));
    }
    else {
      const newActivity = {...activity, id: (activities.length + 1).toString()};
      setselectedActivity(newActivity);
      setActivities([...activities, newActivity ]);
    }
    seteditMode(false);
  }

  const handleDelete = (id: string) => {
    setActivities(activities.filter(x => x.id !== id));
  }

  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee' }}>
        <CssBaseline />
        <NavBar openForm={handleOpenForm} />
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
            submitForm={handleSubmitForm}
            deleteActivity={handleDelete}
          />
        </Container>
      </Box>
    </>
  )
}

export default App
