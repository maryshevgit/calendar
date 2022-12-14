import React, { useRef, useState } from 'react'
import Input from '../ui/Input'
import {ReactComponent as Arrow} from '../assets/arrow.svg'
import {ReactComponent as Cancel} from '../assets/cancel.svg'
import Button from '../ui/Button'
import { useDispatch } from 'react-redux'
import { addSelectItem, selectModal } from '../redux/modalSlice'
import { month } from '../hooks/useCalendar'

const MiniModal = ({active, setActive}) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const closeModal = () => {
        setActive(!active)
    }

    let today = new Date(); 
    let year = today.getFullYear();
    
    const newValue = value && value.split(",")
    console.log(newValue)
    
    const date = newValue && newValue[1] && newValue[0].split(" ")

    let monthSelect, day, fullYear

    month.forEach((item, i) => {
        if(date && item === date[1]){
            monthSelect = i
            day = date[0]
            fullYear = date[2]
        }
    })

    const todayFormatted = monthSelect >= 0 && day && `${day}-${monthSelect + 1}-${fullYear || year}`;

    const addEvent = () => {
        if(newValue.length === 3){
          dispatch(addSelectItem({
            select: todayFormatted,
            desc: newValue[1],
            event: newValue[2],
            info: true
          }))
          dispatch(selectModal(todayFormatted))
        }
        setActive(false)
        setValue('')
      }

  return (
    <div className={`header__modal ${active ? 'active' : ''}`}>
        <div className='header_modal__arrow'>
            <Arrow />
        </div>
        <div className='modal__body'>
          <div className='modal__close'>
            <Cancel onClick={closeModal}/>
          </div>
          <div>
            <div className='modal__inputs'>
                <Input 
                  value={value} 
                  onChange={e => setValue(e.target.value)} 
                  className={`input ${(newValue && newValue.length <= 2) || newValue.length > 3 ? 'wrong_input' : '' }`}
                  placeholder='15 ?????????? (??????), ????????????????, ??????????????' 
                />
            </div>
          </div>
          <div className='modal__buttons'>
            <Button 
              className={`calendar__today ${(newValue && newValue.length <= 2) || newValue.length > 3 ? 'disabled_button' : ''}`} 
              onClick={addEvent}
            >??????????????</Button>
          </div> 
        </div>
    </div>
  )
}

export default MiniModal
