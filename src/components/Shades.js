import React, { useState,useContext } from 'react'
import tinycolor from 'tinycolor2'
import clipboard from 'clipboard'

import Header from './Header'
import ShadeCard from './ShadeCard'
import {AlertContext} from '../contexts/AlertContext'

export default function Shades() {

  const [color, setColor] = useState('#4299e1')
  const { setMessage, showPopup } = useContext(AlertContext)

  var brightenList = [], darkenList=[], step =8;
  for (let i=100; i>=0 ;i-=step) brightenList.push( tinycolor(color).brighten(i).toString() )
  for (let i=0; i<=100 ;i+=step) darkenList.push(tinycolor(color).darken(i).toString())
  var shadesList= [...brightenList,...darkenList ] ;
  shadesList = [...new Set(shadesList)]


  var copyClassName = 'copyShade'
  // eslint-disable-next-line
  var Clipboard = new clipboard("."+copyClassName);

  return (
    <>
      <Header addColor={setColor}/>

      <div onLoad={()=> setMessage("Copied")} className="px-4 w-full --bg-indigo-700 gap-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" >

          {

            shadesList.map((color,inx)=>{
              return (
                <ShadeCard color={color} key={inx} copyId={`shadeCopyId-${inx}`}
                  textColor={tinycolor(color).isLight() ? "#000000" : "#ffffff"}
                  copyClassName={copyClassName}
                  showPopup={showPopup}
                />
              )
            })
          }



      </div>
    </ >
  )
}
