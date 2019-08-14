import React, {Component} from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './App.css';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class App extends Component{

  state = {
    client:'other',
    clientName:'',
    clientAddress: '',
    clientEmail: '',
    clientPhone: '',
    po: '',
    jobDescription1: '',
    jobDescription2: '',
    dayRate: 0,
    quantity: 0,
    selectedDays:[]
  }

  handleChange = ({target:{value, name}}) => {
    this.setState({
      [name]: value
    });

    if(name === 'client' && value === 'quad'){
      this.setState(() => ({     
        clientName: 'Quad Graphics',
        clientAddress: 'Accounts Payable, 424 West 8th Street, Monroe, WI 53566',
        clientEmail: 'accountspayable@qg.com',
        clientPhone: '(608) 438-4078' }));
    }

    if(name === 'client' && value === 'chris'){
      this.setState(() => ({     
        clientName: 'Chris Hynes Photography',
        clientAddress: '931 East Main St. #3 Madison WI 53703',
        clientEmail: 'chris@chrishynesphoto.com',
        clientPhone: '(608) 251-2500' }));
    }

    if(name === 'client' && value === 'other'){
      this.setState(() => ({     
        clientName: '',
        clientAddress: '',
        clientEmail: '',
        clientPhone: '' }));
    }


  }

  getDateString = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  handleDayClick = (day, { selected }) => {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });

    console.log(selectedDays);
  }



  createAndDownloadPdf = () => {
    const fileName = this.getDateString() + '.pdf';    
    axios.post('/create-pdf', this.state)
    .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
    .then((res)=>{
      const pdfBlob = new Blob([res.data], {type: 'application/pdf'});
      saveAs(pdfBlob, fileName);
    })
  }

  render(){

    return (
      <div className="App">
        <div className="container py-3">
            <div className="row">
              <div className="col-md-12">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                        <span className="anchor" id="formLogin"></span> 
                      
                        <div className="card card-outline-secondary">
                          <div className="card-header">
                              <h3 className="mb-0">Invoice</h3>
                          </div>
                          <div className="card-body">
                              <form autoComplete="on" className="form">


                                <div className="form-group">
                                  <label>
                                    Existing clients
                                    <select className="form-control" value={this.state.client} name="client" onChange={this.handleChange}>
                                      <option value="quad">Quad Graphics</option>
                                      <option value="chris">Chris Hynes Photo</option>
                                      <option value="other">Other</option>
                                    </select>
                                  </label>
                                </div>

                                {/* { this.state.client ==='other' &&       */}
                                <div className="clientInfo">
                                  <div className="form-group">
                                    <label htmlFor="clientName">Client Name</label> 
                                    <input type="email" id="clientName" className="form-control" value={this.state.clientName} name="clientName" onChange={this.handleChange}/>
                                  </div>

                                  <div className="form-group">
                                    <label htmlFor="clientPhone">Client Phone</label>
                                    <input type="email" id="clientPhone" className="form-control" value={this.state.clientPhone} name="clientPhone" onChange={this.handleChange}/>
                                  </div>

                                  <div className="form-group">
                                    <label htmlFor="clientEmail">Client Email</label>
                                    <input type="email" id="clientEmail" className="form-control" value={this.state.clientEmail} name="clientEmail" onChange={this.handleChange}/>
                                  </div>

                                  <div className="form-group">
                                    <label htmlFor="clientAddress">Client Address</label>
                                    <input type="text" id="clientAddress" className="form-control" value={this.state.clientAddress} name="clientAddress" onChange={this.handleChange}/>
                                  </div>
                                </div>
                                {/* } */}
                                
                                <div className="form-group">
                                  <label htmlFor="po">Purchase order</label>
                                  <input type="text" id="po" className="form-control" value={this.state.po} name="po" onChange={this.handleChange}/>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="jobDescription1">Job description</label>
                                  <input type="text" id="jobDescription1" className="form-control" value={this.state.jobDescription1} name="jobDescription1" onChange={this.handleChange}/>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="jobDescription2">Dates</label>
                                  <input type="text" id="jobDescription2" className="form-control" value={this.state.jobDescription2} name="jobDescription2" onChange={this.handleChange}/>
                                </div>
{/* 
                                <DayPicker
                                  selectedDays={this.state.selectedDays}
                                  onDayClick={this.handleDayClick}
                                /> */}

                                <div className="form-group">
                                  <label htmlFor="quantity">Quantity</label>
                                  <input type="number" id="quantity" className="form-control" value={this.state.quantity} name="quantity" onChange={this.handleChange}/>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="dayRate">Day Rate</label>
                                  <input type="number" id="dayRate" className="form-control" value={this.state.dayRate} name="dayRate" onChange={this.handleChange}/>
                                </div>

                                <button className="btn btn-success btn-lg float-right" type="button" onClick={this.createAndDownloadPdf}>Create Invoice</button>
                              </form>
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>

      </div>
    );
  }
}


export default App;
