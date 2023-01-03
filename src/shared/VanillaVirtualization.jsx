import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

function VanillaVirtualization() {
  const [maximumIndex] = useState(1_000)
  const [topScroll, setTopScroll] = useState(0)
  const outerHeight = 500
  const itemHeight = 30
  const innerHeight = maximumIndex * itemHeight
  const startIndex = Math.max(0, Math.floor(topScroll/itemHeight) - 3)
  const endIndex = Math.min(Math.floor((outerHeight + topScroll)/itemHeight) + 3, maximumIndex )
  console.log(startIndex, endIndex)


  const data = Array.from({ length: maximumIndex }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}`,
  }))

  function renderDataItem ()  {
    const slicedArray = data.slice(startIndex, endIndex)
    const mappedList = slicedArray.map((item) => {
      const topPosition = itemHeight * item.id
      return <div
        style={{
          position: 'absolute',
          height: itemHeight,
          top:topPosition,
          left: 0,
          right: 0,
        }}
      key={item.id}>{item.title}</div>
    })

    return mappedList
  }

  function onScroll(event){
    console.log(event.currentTarget.scrollTop)
    setTopScroll(event.currentTarget.scrollTop)
  }

  return (
    <div className='App' style={{background:'white', textAlign:'center'}}>
      {/* <h2>TODo</h2> */}
      <div className='outer-container' onScroll={onScroll} style={{ overflowY:'scroll', height:outerHeight}}>
        <div className='inner-container' style={{position:'relative', height:innerHeight}}>
          {renderDataItem()}
          </div>
      </div>
    </div>
  )
}

export default VanillaVirtualization
