import { Component} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Setup the localizer by providing the moments Object
// to the correct localizer.
const localizer = momentLocalizer(moment); 

class AdminCalendar extends Component {
    constructor(props){
        super(props);
        this.state={
          eventslist: [],
          showAdd: false,
          showEdit: false,
          start: null,
          end: null,
          newevent: null,
          eventid: null
        };       
    }
   
    // Get all the events from database and store in eventslist state variable
    componentDidMount(){
       axios.get("http://localhost:8080/events/allevents/")
       .then((res)=>{
            console.log(res.data);
            console.log(res.data.events);
            // ISO Date in MongoDB database should be converted to JavaScript Date format for the calendar.      
            res.data.events.forEach(element => {
              element.start=new Date(element.start);
              element.end = new Date(element.end);
            })
            this.setState({eventslist: res.data.events})
       }).catch((error)=>{
            console.log(error);
       })
    }

    // The methods to open and close "Add event" modal, and "Edit event" modal.
    handleShowAdd = ({ start, end}) => this.setState({ start: start, end: end, showAdd: true});
    handleShowEdit = ({_id, start, end}) => this.setState({eventid: _id, start: start, end: end, showEdit: true});
    handleCloseAdd = () => this.setState({showAdd: false});
    handleCloseEdit = () => this.setState({showEdit: false});
    
    // To store input into corresponding state variable
    handleChange=(e)=> {
        this.setState({[e.target.name]: e.target.value})
    }

    // After Add button is clicked in the "Add event" modal.
    handleAdd = async() => {
        if(this.state.start && this.state.end && this.state.newevent){
            let data = {
                start: this.state.start,
                end: this.state.end,
                title: this.state.newevent
            }
            try {
                // Adding the new event to database
                const res = await axios.post("http://localhost:8080/events/addevent",  data);

                // ISO Date in MongoDB database should be converted to JavaScript Date format for the calendar.
                res.data.results.start = new Date(res.data.results.start);
                res.data.results.end = new Date(res.data.results.end);

                // New event is pushed to eventslist state array
                this.state.eventslist.push(res.data.results)
                this.handleCloseAdd(); 
                console.log(res.data.results);  
            }catch(error){
                console.log(error);
            } 
        }else{
            console.log("Nothing works, tee-hee!");
        }        
    }

    // After Edit button is clicked in the "Edit event" modal.
    handleEdit = async() => {
        if(this.state.start && this.state.end && this.state.newevent && this.state.eventid){
            let data = {
                eventid: this.state.eventid,
                start: this.state.start,
                end: this.state.end,
                title: this.state.newevent
            }
            try {
                // Send event details, so that they can be compared and updated in the database.
                const res = await axios.post("http://localhost:8080/events/updateevent",  data);

                // ISO Date in MongoDB database should be converted to JavaScript Date format for the calendar.
                res.data.results.start = new Date(res.data.results.start);
                res.data.results.end = new Date(res.data.results.end);

                // Update the eventlist array, find the element index with corresponding event ID 
                let index = this.state.eventslist.findIndex((element)=> element._id === this.state.eventid);
                // Update with new value from database
                this.state.eventslist.splice(index, 1, res.data.results)
                this.handleCloseEdit(); 
               
            }catch(error){
                console.log(error);
            } 
        }else{
            console.log("Nothing works, tee-hee!");
        }        
    }

    // After "Delete" is pressed in "Edit Event" modal
    handleDelete = async() => {
        if(this.state.eventid){
            let data = {
                eventid: this.state.eventid,
            }
            try {
                // Delete in database
                const res = await axios.post("http://localhost:8080/events/deleteevent",  data);
                // Find and delete in eventslist state array
                let index = this.state.eventslist.findIndex((element)=> element._id === this.state.eventid);
                this.state.eventslist.splice(index, 1)
                this.handleCloseEdit(); 
                console.log(res.data);
               
            }catch(error){
                console.log(error);
            } 
        }else{
            console.log("Nothing works, tee-hee!");
        }        
    }

    render() {
        
        return (
            <div className="rbc-calendar">
                <Calendar
                  selectable
                  popup
                  localizer={localizer}
                  events={this.state.eventslist}
                  startAccessor="start" 
                  endAccessor="end"
                  onSelectSlot={this.handleShowAdd}
                  onSelectEvent={this.handleShowEdit} 
                />
                <Modal centered show={this.state.showAdd} onHide={this.handleCloseAdd}> 
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="newevent">
                                <Form.Control type="text"  name="newevent" placeholder="Enter new event name" onChange={this.handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleAdd}>
                            Add Event
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showEdit} onHide={this.handleCloseEdit}> 
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Current Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="newevent">
                                <Form.Control type="text"  name="newevent" placeholder="Enter new event name" onChange={this.handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseEdit}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.handleDelete}>
                            Delete Event
                        </Button>
                        <Button variant="primary" onClick={this.handleEdit}>
                            Edit Event
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        );
      }
}


export default AdminCalendar;