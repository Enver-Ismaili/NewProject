import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

function App() {
const [activities, setActivities] = useState<Activity[]>([]);

useEffect(() => {
  //fetch data from API 
  // fetch('https://localhost:5001/api/activities')
  //   .then(response => response.json())
  //   .then(data => setActivities(data))

  //fetch data using axios
  axios.get<Activity[]>('https://localhost:5001/api/activities')
    .then(response => setActivities(response.data))
    return () => {}
}, [])
  return (
    <>
      <Typography variant='h3'>Reactivities</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>  
    </>
  )
}

export default App
