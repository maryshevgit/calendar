import React, { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { month } from '../hooks/useCalendar'
import { useDispatch } from 'react-redux'
import { addSelectItem, deleteItem, deleteSelect } from '../redux/modalSlice'
import {ReactComponent as Cancel} from '../assets/cancel.svg'
import {ReactComponent as Arrow} from '../assets/arrow.svg'


const Modal = ({active, setActive, date, findItem}) => {
  const [event, setEvent] = useState('')
  const [names, setNames] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const addEvent = () => {
    if(event && names){
      dispatch(addSelectItem({
        select: date,
        event: event,
        name: names,
        desc: description,
        info: true 
      }))
    }
  }

  const deleteEvent = (id) => {
    dispatch(deleteItem(id))
    setEvent('')
    setNames('')
    setDescription('')
  }

  const closeModal = () => {
    dispatch(deleteSelect())
    setActive(false)
  }

  let monthSelect, day, fullYear

  const newDate = date.split("-")
  month.forEach((item, i) => {
    if(newDate && newDate[1] - 1 === i){
        monthSelect = item
        day = newDate[0]
        fullYear = newDate[2]
    }
  })

  return (
    <div className={`${active ? 'active' : ''}`}>
        <div className='modal__arrow'>
            <Arrow />
        </div>
        <div className='modal__body' onClick={(e) => e.stopPropagation()}>
          <div className='modal__close' >
            <Cancel onClick={closeModal}/>
          </div>
          <div >
              {findItem[0] && findItem[0].info 
                ? 
                  <div className='modal__info'>
                    <div className='modal__event'>
                      {event || findItem[0].event}
                    </div>
                      {`${day} ${monthSelect} ${fullYear}`}
                    <div>
                      <div className='modal__members'>
                        ??????????????????:
                      </div>
                      {names || findItem[0].name}
                    </div>
                    
                  </div>
                :
                  <div>
                    <div className='modal__inputs'>
                      <Input
                        value={event} 
                        onChange={e => setEvent(e.target.value)} 
                        className='input' placeholder='??????????????' />
                      <Input
                        value={names} 
                        onChange={e => setNames(e.target.value)} 
                        className='input' placeholder='?????????? ????????????????????' />
                    </div>
                  </div>
              }
              {findItem[0] && findItem[0].desc && findItem[0].info  
                ?
                  <div className='modal__desc'>
                    {description || findItem[0].desc}
                  </div>
                :
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className='input text-area' placeholder='????????????????'
                />
              }
              
          </div>
          <div className='modal__buttons'>
            <Button 
              className={`calendar__today ${!(event && names) ? 'disabled_button' : ''}`}
              onClick={addEvent}
            >????????????</Button>
            <Button 
              className={`calendar__today ${!findItem[0] ? 'disabled_button' : ''}`}
              onClick={() => deleteEvent(findItem[0].select)}
            >??????????????</Button>
          </div> 
        </div>
    </div>
  )
}

export default Modal
