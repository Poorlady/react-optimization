import React from 'react'
import { useInView } from 'react-intersection-observer'

const Virtualization = ({ height, children }) => {
  const [ref, inView] = useInView()
  const style = {
    height: `${height}px`,
    overflow: 'hidden',
  }
  console.log(inView)
  return (
    <div style={style} ref={ref}>
      {inView ? children : null}
    </div>
  )
}

export default Virtualization
