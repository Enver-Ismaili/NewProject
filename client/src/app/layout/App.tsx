import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, seteditMode] = useState(false);
  const {activities, isPending} = useActivities();

  // useEffect(() => {
     //fetch data from API 
     // fetch('https://localhost:5001/api/activities')
     //   .then(response => response.json())
     //   .then(data => setActivities(data))

     //fetch data using axios
  //   axios.get<Activity[]>('https://localhost:5001/api/activities')
  //     .then(response => setActivities(response.data))
  //   return () => { }
  // }, [])

  const handleSelectActivity = (id: string) => {
    setselectedActivity(activities!.find(x => x.id === id));
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

  

  

  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
        <CssBaseline />
        <NavBar openForm={handleOpenForm} />
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          {!activities || isPending ? (<Typography>Loading activities...</Typography> )
          : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
          />
          )}
        </Container>
      </Box>
    </>
  )
}

export default App
