import React, {useState, useEffect}from 'react';
import { Link } from "react-router-dom";
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

// moods
import API from "../../module/dataManager.js"
import { 
    Comeback
}
from "../../Helpers"

const JoinEvent = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isEventLoaded, setIsEventLoaded] = useState(false)
    const [eventCode, setEventCode] = useState("");
    const [event, setEvent] = useState({
        name: "" , 
        userId: null, 
        address: "", 
        date: "", 
        time: "", 
        description: "", 
        eventcode: "" 
    })

    // Handle changes in the username, email, password
    const handleChange = (e) => {
        let stateToChange = eventCode
        stateToChange = e.target.value
        setEventCode(stateToChange)
    }

    // Search for event code
    const checkEventCode = async () => {
        const eventQuery = await API.getWhere("events", "eventcode", eventCode)
        console.log(eventQuery)
            if (eventQuery.length === 0){
                setIsEventLoaded(false)
            }
            else if (eventQuery.length === 1) {
                setEvent(eventQuery[0])
                setIsEventLoaded(true)
            }
    }

    // Handle the submit of event code search
    const checkOnClick = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        await checkEventCode();
        setIsLoading(false)
    }

    // Listener to the event moodification
    // useEffect(() => {await checkEventCode()}, [])

    return <>
        <Comeback />
        <Jumbotron className="container mt-5">
            <h5 className="display-4">Join Gathering</h5>
            <p>Please enter the EVENT CODE provided by the gathering author</p>
            <hr />
            <Form onSubmit={checkOnClick}>
                <FormGroup className="form-row">
                    <Input className="col" onChange={handleChange} type="text" name="eventcode" id="eventcode" placeholder="Enter the event code" />
                    <Button disabled={isLoading} className="col" type="submit">Search</Button>
                </FormGroup>
            </Form>
            {
            isEventLoaded && <div>
                <div>
                    <h4>{event.name}</h4>
                    <h6>by: {}</h6>
                    <h5>{event.date} at {event.time}</h5>
                    <h5>Address: <span>{event.address}</span> </h5>
                    <h5> {event.description} </h5>
                </div>
                <Link to="/JoinEventRegister"><button>Join!</button></Link>
            </div>
            }
        </Jumbotron>
    </>
};

export default JoinEvent;