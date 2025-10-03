import React, { FC, useState } from 'react';
interface ItemProps{
    text?: String,
    day?: number,
    timeStart?: number,
    timeEnd?: number,
    borderType?: boolean[],
    shiftMaker?: () => null,
    taken?: boolean
}

const createShift = (propF?: ((day?: number, timeStart?: number, timeEnd?: number) => null), day?: number, timeStart?: number, timeEnd?: number) => {
    if (propF != undefined){
        propF(day, timeStart, timeEnd)

    }
}

const Item: FC<ItemProps> = (prop?) => {
    // const [background, setBackground] = useState<string>("white")
    // if (prop?.taken == true){
    //     setBackground("red")
    // }

    let background = "white"
    if (prop?.taken){
        background = "red"
    }

    const style = {
      backgroundColor: background,
    };
    return(
        <div
        style={style}
        onClick={() => createShift(prop?.shiftMaker, prop?.day, prop?.timeStart, prop?.timeEnd)}>{prop?.text}</div>
    )
}

export default Item;