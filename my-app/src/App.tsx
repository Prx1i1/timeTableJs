import React, { ReactElement, useState } from 'react';
import './App.css';

import Grid from "@mui/material/Grid"
//import Item from "@mui/material/Grid"
import { Card, Paper, styled } from '@mui/material';

import Item from "./component/Item"

let days: String[] = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
let id = 1; //checked employee id

interface employeeCard{
  id: number,
  times: timeRange[]
}

interface timeRange{
  day: number,
  start: number,
  end: number
}

interface cellRes{
  active: boolean,
  text: string
}



function App() {
    //data for makeshift
  let dataShifts: timeRange| null = null;
  let firstTime: number|null = null;
  let firstDay: number|null = null; 

  //function to pass in shift maker slot

  const makeShift = (day: number, timeStart: number, timeEnd: number, ) => {
    //set first point
    if (dataShifts == null){
      let time = timeStart
      firstDay = day
      firstTime = time

      //maybe add highlight here
    }else{
      //make time zone
      if (day === firstDay){

        let time = timeEnd

        dataShifts = {
          day: day,
          start: Math.min(firstTime!, time),
          end: Math.max(firstTime!, time)
        }

        //add to employee
        employees.find((e) => e.id === id)?.times.push(dataShifts)
        //reset page
        updateEmployees(employees)

        //reset
        dataShifts = null

      }else{
        //pass or cancel?
      }
    }

  }

  // const Item = styled('div')(({ theme }) => ({
  //   backgroundColor: '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: (theme.vars ?? theme).palette.text.secondary,
  //   ...theme.applyStyles('dark', {
  //     backgroundColor: '#1A2027',
  //   }),
  // }));

  let times: timeRange[] = [{day: 0, start: 1,end: 2}, {day: 0, start: 2, end: 3}, {day: 0 , start:3, end:4}]

  let employees: employeeCard[] = [{id: 1, times: [ {day: 2, start: 2, end: 3} ]}]
  const [employeesList, updateEmployees] = useState<employeeCard[]>(employees)

  const createTimeSpace = (): ReactElement[] => {

    let temp: ReactElement[] = [];

    for (let t = 0; t < times.length; t++) {
      const rowTime: ReactElement = <Grid size={1}>
        <Item text={String(times[t].start) + " - " + String(times[t].end)} />
        </Grid>;
      
      temp.push(rowTime)

      for (let index = 1; index <= days.length; index++) {
        let res: cellRes = checkEmployee(id, index, times[t].start, times[t].end)
        const element = <Grid size={1}>
          <Item day={index} timeStart={times[t].start} timeEnd={times[t].end} text={res.text} taken={res.active}/>
          
        </Grid>;
        temp.push(element)
      }

    }

    return temp;
  }

  const checkEmployee = (id: number, day: number, start: number, end: number): cellRes => {
    let cellText: string = String(0);
    let taken: boolean = false;
    employees.forEach((e) => {
      if (e.id === id){

        e.times.forEach((time) => {
          if (time.day === day){
            if (time.start <= start && time.end >= end){
              cellText = String(id);
              taken = true;
            }
            
          }
        })
        
      }

    })

    return {active: taken, text: cellText};

  }

  return (
    <div className="App">
      <header>
        <label><input type='text' onChange={(e) => console.log(e.target.textContent)}></input></label>
      </header>
      <div className='scheduleContainer'>
        <Grid container columns={8}>
        <Grid size={1}><Item/></Grid>
        {days.map((day) => (
          <Grid size={1}>
            <Item text={day}/>
          </Grid>
        ))}
        
        {/* content */}
        {createTimeSpace()}

        </Grid>
      </div>
    </div>
  );
}

export default App;
