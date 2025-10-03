import React, { FC, useState } from 'react';
interface ItemProps{
    text?: String,
    day?: number,
    timeStart?: number,
    timeEnd?: number,
    borderType?: boolean[],
    shiftMaker?: (day?: number, timeStart?: number, timeEnd?: number) => void,
    taken?: boolean
}


const Item: FC<ItemProps> = (prop?) => {
    // const [background, setBackground] = useState<string>("white")
    // if (prop?.taken == true){
    //     setBackground("red")
    // }
    const createShift = (propF?: ((day?: number, timeStart?: number, timeEnd?: number) => void), day?: number, timeStart?: number, timeEnd?: number) :void => {
        if (propF !== undefined){
            propF(day, timeStart, timeEnd)
            //debug
            setBackground("blue")
        }
    }

    let background = "white"
    if (prop?.taken){
        background = "red"
    }

    const [backgroundHook, setBackground] = useState<string>(background)

    const style = {
      backgroundColor: backgroundHook,
    };
    return(
        <div
        style={style}
        onClick={() => createShift(prop?.shiftMaker, prop?.day, prop?.timeStart, prop?.timeEnd)}>{prop?.text}</div>
    )
}

export default Item;