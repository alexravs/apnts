import React, { Component } from 'react';
import { render } from 'react-dom';
import groupBy from 'lodash/groupBy'
import {getCurrentWeek, getWeekDays} from './dateUtilities.js';

const appointmentDates = [
  { startdate: '29/01/2018:08', enddate: '29/01/2018:12' },
  { startdate: '29/01/2018:08', enddate: '29/01/2018:12' },
  { startdate: '29/01/2018:08', enddate: '29/01/2018:12' },
  { startdate: '29/01/2018:08', enddate: '29/01/2018:12' },
  { startdate: '29/01/2018:08', enddate: '29/01/2018:12' },
  { startdate: '29/01/2018:08', enddate: '29/01/2018:12' },
  { startdate: '29/01/2018:08', enddate: '29/01/2018:12' },
  { startdate: '02/02/2018:14', enddate: '02/02/2018:18' },
  { startdate: '02/02/2018:14', enddate: '02/02/2018:18' },
  { startdate: '02/02/2018:14', enddate: '02/02/2018:18' },
  { startdate: '02/02/2018:14', enddate: '02/02/2018:18' }
]

const rangeTimes = [
    {start: '08', end: '12'},
    {start: '12', end: '14'},
    {start: '14', end: '18'},
    {start: '18', end: '20'}
]


// will be done once, results will be stored in the store.
const groupAppointmentDates = () => {
    return groupBy(appointmentDates, date => `${date.startdate}-${date.enddate}`)
}

class AppointmentsRow extends Component {
    renderAppointmentInfos = (appointmentKey) => {
        const dates = groupAppointmentDates();
        const appointments = dates[appointmentKey];

        return appointments ? appointments.length : 0;
    }

    getAppointmentKey = (rangeTime, date) => {
        const day = date.format('DD/MM/YYYY')
        return `${day}:${rangeTime.start}-${day}:${rangeTime.end}`;
    }

   render() {
       const {rangeTime, weekDays} = this.props;
        return (
            <tr>
                <td>
                    {rangeTime.start}-{rangeTime.end}
                </td>
                {weekDays.map(day => (
                    <td>
                        {this.renderAppointmentInfos(this.getAppointmentKey(rangeTime, day))}
                    </td>
                ))}
            </tr>
        )
   } 
}

class Calendar extends Component {
    state = {
        currentWeek: getCurrentWeek()
    }

    previousWeek = () => this.setState({ currentWeek: this.state.currentWeek - 1 })

    nextWeek = () => this.setState({ currentWeek: this.state.currentWeek + 1 })




    render() {
        const weekDays = getWeekDays(this.state.currentWeek);

        return (
            <div>
                <div>
                    <button onClick={this.previoustWeek}>previous</button>
                    <button onClick={this.nextWeek}>next</button>
                </div>
                <table>
                    <thead>
                        <td>Time</td>
                        {weekDays.map(day => (
                            <td>{day.format('DD/MM/YYYY')}</td>
                        ))}
                    </thead>
                    <tbody>
                        {rangeTimes.map(rangeTime => (
                            <AppointmentsRow rangeTime={rangeTime} weekDays={weekDays} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

 export default Calendar;