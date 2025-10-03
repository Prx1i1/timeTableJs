import React from 'react';

interface scheduleProps{
    id: number
    day: number
    timeStart: number
    timeEnd: number
    removeSchedule: (id: number, day: number, timeStart: number, timeEnd: number) => void
}

const ScheduleTile = (props: scheduleProps) => {


    return (
    <div className='scheduleMain'>
        <div>{props.id}</div>
        <div>{props.day}</div>
        <div>{props.timeStart} - {props.timeEnd}</div>
        <div><button onClick={(e) => props.removeSchedule(props.id, props.day, props.timeStart, props.timeEnd)}>icon:x</button></div>
    </div>
    )
}

export default ScheduleTile