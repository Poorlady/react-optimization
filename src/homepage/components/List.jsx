import React from 'react'

const List = ({ itemCount, itemSize, height, width, handleScroll, children }) => {
  return (
    <div
      className='outer-container'
      style={{ overflowY: 'scroll', height, width, border:'1px solid red' }}
      onScroll={handleScroll}
    >
      <div
        className='inner-container'
        style={{
          height: itemCount * itemSize,
          position: 'relative',
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default List
