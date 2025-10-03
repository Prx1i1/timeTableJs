import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import './App.css';

import Grid from "@mui/material/Grid"
//import Item from "@mui/material/Grid"
import { Card, Paper, styled } from '@mui/material';

import Item from "./component/Item"
import ScheduleTile from './component/ScheduleTile';

let days: String[] = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
let id = 1; //checked employee id
let times: timeRange[] = [{day: 0, start: 1,end: 2}, {day: 0, start: 2, end: 3}, {day: 0 , start:3, end:4}]
let employees: employeeCard[] = [{id: 1, times: [ {day: 2, start: 2, end: 3} ]}]

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

interface daySchedule{
  day: number
  times: timeRange[]
}

function App() {
    //data for makeshift
  let temp = 0;
  let dataShifts: timeRange| null = null;
  let firstTime: number| undefined;
  let firstDay: number| undefined; 

  const [employeesList, updateEmployees] = useState<employeeCard[]>(employees)
  const [counter, resetPage] = useState<number>(0)

  const PageContext = createContext(employeesList)
  const ResetContext = createContext(counter)

  const scheduleResolver = (id: number) => {
    let schedule: timeRange[] = employeesList.find((e) => e.id === id)!.times
    let daySchedules: daySchedule[] = []

    for (let index = 1; index <= days.length; index++) {
      let temp: daySchedule = {day: index, times: []}

      schedule.forEach((e) => {
        if(e.day === index){
          temp.times.push()
        }
      })
    }

  }

  const removeSchedule = (id: number, day:number, timeStart: number, timeEnd: number) => {
    let employees = employeesList 
    let index: number = employeesList.findIndex((e) => (e.id == id))!
    employees[index].times.splice(employeesList.find((e) => (e.id == id))?.times.findIndex((e) => (e.day == day && e.start == timeStart && e.end == timeEnd))!, 1)
    updateEmployees(employees)

    resetPage(counter+1)

    console.log("schedule removed", employeesList)

  }

  const makeShift = (day?: number| undefined, timeStart?: number | undefined, timeEnd?: number| undefined): void => {
    //set first point
    if (temp == 0){
      let time = timeStart
      firstDay = day
      firstTime = time
      console.log("added first")
      temp+=1
      //maybe add highlight here
    }else{
      //make time zone
      console.log("second", day, firstDay)
      if (day === firstDay){

        let time = timeEnd

        dataShifts = {
          day: day!,
          start: Math.min(firstTime!, time!),
          end: Math.max(firstTime!, time!)
        }

        console.log("adding timeshift", dataShifts)

        //add to employee
        let employee = employeesList
        employee.find((e) => e.id === id)?.times.push(dataShifts)
        //reset page
        updateEmployees(employee)
        resetPage(counter+1)
        console.log(employee)

        //reset
        dataShifts = null
        temp = 0

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


  const createTimeSpace = (e: employeeCard[]): ReactElement[] => {

    let temp: ReactElement[] = [];

    for (let t = 0; t < times.length; t++) {
      const rowTime: ReactElement = <Grid size={1}>
        <Item text={String(times[t].start) + " - " + String(times[t].end)} />
        </Grid>;
      
      temp.push(rowTime)

      for (let index = 1; index <= days.length; index++) {
        let res: cellRes = checkEmployee(id, index, times[t].start, times[t].end)
        const element = <Grid size={1}>
          
          <Item shiftMaker={makeShift} day={index} timeStart={times[t].start} timeEnd={times[t].end} text={res.text} taken={res.active}/>
          
        </Grid>;
        temp.push(element)
      }

    }

    return temp;
  }

  const checkEmployee = (id: number, day: number, start: number, end: number): cellRes => {
    let cellText: string = String(0);
    let taken: boolean = false;
    let employees = employeesList;
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

  const generateScheduleList = (id: number): ReactElement[] => {
    let temp: ReactElement[] = [];
    let ref = employeesList.find((e) => e.id === id)?.times

    ref?.forEach((time) => {
      temp.push(<ScheduleTile id={id} day={time.day} timeStart={time.start} timeEnd={time.end} removeSchedule={removeSchedule}/>)
    })

    return temp
  }

  return (
    <div className="App">
      <ResetContext value={0}>
      <header>
        <label><input type='text' onChange={(e) => console.log(e.target.textContent)}></input></label>
        <PageContext value={employeesList}>
          <div className='scheduleList'>
            <div className='scheduleMain'>
            <div>id</div>
            <div>dzień</div>
            <div>czas</div>
            <div></div>
          </div>
            {generateScheduleList(id)}
          </div>
        </PageContext>
      </header>
      <div className='scheduleContainer'>
        <PageContext value={employeesList}>
        <Grid container columns={8}>
        <Grid size={1}><Item/></Grid>
        {days.map((day) => (
          <Grid size={1}>
            <Item text={day}/>
          </Grid>
        ))}
        
        {/* content */}
        {createTimeSpace(employeesList)}

        </Grid>
        </PageContext>
      </div>
      </ResetContext>
    </div>
  );
}

export default App;
