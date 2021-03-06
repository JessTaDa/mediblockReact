import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Input} from 'react-materialize';

export default class CreatePrescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      name: "",
      doctorAddress: "",
      patientAddress: "",
      medication: "",
      startDate: moment(),
      expirationDate: moment(),
    }
  }

  render(props) {
    return (
      <div>
      <h5>Your address is: </h5>
      <h7>{this.props.doctorAddress}</h7>
      <br/>
      <br/>
      <br/>
      <h7>Fill in the below form to create a new prescription for a patient:</h7>
      <h5>Create New Prescription</h5>
      <br/>
        <form onSubmit={async (event) => {
          event.preventDefault()
          await this.props.instance.createPrescription(this.state.name, this.props.doctorAddress, this.state.patientAddress, this.state.medication, this.state.startDate.unix(), this.state.expirationDate.unix(), {from: this.props.doctorAddress})
        }}>
          <Input s={12} label="Patient Full Name" type="text" onChange={event => this.setState({name: event.target.value})} />
          <Input s={12} label="Patient Address" id="msg.sender" type="text" value={this.state.patientAddress} onChange={event => this.setState({patientAddress: event.target.value})} />
          <Input s={12} label="Medication" type="text" onChange={event => this.setState({medication: event.target.value})} />
          <label for="expirationDate"> Expiration date</label>
          <DatePicker selected={this.state.expirationDate} onChange={(date) => this.setState({expirationDate: moment(date)})}/>
          <Button class="btn waves-effect waves-light" type="submit" name="action">Create Prescription</Button>
        </form>
      </div>
    );
  }
}
