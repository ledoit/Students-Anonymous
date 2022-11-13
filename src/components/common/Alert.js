import React from 'react'

export default function Alert({
  show,
  variant = 'danger',
  className = '',
  children,
  onClose
}) {
  return (
    <>
      {
        show ?
          <div
            className={"alert alert-" + variant + ' ' + className
            }
            role="alert" >
            <div className='d-flex justify-content-between'>
              <div>
                {children}
              </div>

              <div
                style={{ cursor: 'pointer' }}
                onClick={onClose}>X</div>
            </div>
          </div >
          :
          <></>
      }
    </>
  )
}
