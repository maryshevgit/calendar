import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSelect, selectModal } from '../redux/modalSlice'
import Modal from './Modal'

const Day = ({col, index, daysShort, i }) => {
    const [active, setActive] = useState(false)
    const modalRef = useRef()

    const dispatch = useDispatch()
    const indexItem = useSelector(state => state.modal.selected)
    const selectItem = useSelector(state => state.modal.selectItem)
    
    const findItem = selectItem.filter(item => item.select === col.date)
    
    useEffect(() => {
        indexItem === col.date ? setActive(true) : setActive(false)
    }, [indexItem])

  return (
    <td  
        key={col.date} 
        className={`calendar__item ${findItem[0] ? 'hoverFilled' : 'hoverEmpty'}`} 
        onClick={() => dispatch(selectModal(col.date))} 
        ref={modalRef} 
    >
        {i === 0 ? 
            <div style={{zIndex: 10, position: 'relative'}}>
                {`${daysShort[index]}, ${col.value}`}
                <div className={`calendar__info ${findItem[0] ? 'hoverText' : 'hoverNone'}`}>
                    <div className='calendar__title'>
                        {findItem[0] && findItem[0].event}
                    </div>
                    <div className='calendar__desc'>
                        {findItem[0] && findItem[0].name}
                    </div>
                </div>
            </div>
            :
            <div style={{zIndex: 10, position: 'relative'}}>
                {col.value}
                <div className={`calendar__info ${findItem[0] ? 'hoverText' : 'hoverNone'}`}>
                    <div className='calendar__title'>
                        {findItem[0] && findItem[0].event}
                    </div>
                    <div className='calendar__desc'>
                        {findItem[0] && findItem[0].name}
                    </div>
                </div>
            </div>
        }
        <div className={`modal ${active ? 'active' : ''}`} >
            <Modal 
                findItem={findItem} 
                date={col.date} 
                active={active} 
                setActive={setActive} 
            />
        </div>
    </td>
  )
}

export default Day
