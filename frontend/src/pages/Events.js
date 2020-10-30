import React, {useState , useEffect}from 'react';
import Axios from 'axios'; //using axios to do api calls
import Navigation from '../components/Navigation';
import '../styles/events.css';
function EventsPage(){


  Axios.defaults.withCredentials = true;
  const [eventList, seteventList] = useState([]);
  const [role, setRole] = useState('');
  const [isAdmin, setisAdmin] = useState(false);
  useEffect(()=>{
    Axios.get('http://localhost:3001/api/getEvents').then((response)=>{
      seteventList(response.data);
    })
  }, [])
  
  useEffect(()=>{ //everytime the page loads or refreshes, this useEffect will occur
    Axios.get("http://localhost:3001/login").then((response)=>{
      if(response.data.loggedIn == true){
        if(response.data.user[0].role == 'admin'){
          setisAdmin(true);
        }
        console.log(response.data.user);
        setRole("Welcome " + response.data.user[0].phoneNum + ". You are a "+ response.data.user[0].role);
      }else{
        setRole("not logged in");
      }
    })
  }, []);

  
  return(
    

    <div className="App">
      <Navigation/>
      {role}
      <h1>Insert new events</h1>

      <div className="inputBoxesEvents">
        

      {isAdmin ? //if the person is a admin role, then render the input boxes
      <React.Fragment>
        <div className = "input_events_container">
          <div className = "event_name inner_container">
            <p>Event name:</p> <input type="text" />
          </div>
          <div className = "event_description inner_container">
            <p>Event description:</p> <input type="text" />
          </div>
          <div className = "event_location inner_container" >
            <p>Event location:</p> <input type="text" />
          </div>

        </div>
        </React.Fragment>
        :
        null
      }


      </div>

      <table id="events">
        <tr>
          <th>event_id</th>
          <th>date</th>
          <th>start time</th>
          <th>end time</th>
          <th>event name</th>
          <th>description</th>
          <th>location</th>
          <th>club hosting</th>
          <th>event type</th>
          
        </tr>
        {eventList.map((val)=>{
            return (
            <tr>
              <td>{val.event_id}</td>
              <td>{val.date}</td>
              <td>{val.start_time}</td>
              <td>{val.end_time}</td>
              <td>{val.event_name}</td>
              <td>{val.event_description}</td>
              <td>{val.event_location}</td>
              <td>{val.club_name}</td>
              <td>{val.keyword_name}</td>
            </tr>

            );
          })}
      </table>
    </div>
  );

}

export default EventsPage;