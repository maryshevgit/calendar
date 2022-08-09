import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {ReactComponent as Arrow} from '../assets/arrow.svg'
import useCalendar from '../hooks/useCalendar'
import { selectModal } from '../redux/modalSlice'
import Button from '../ui/Button'
import Day from './Day'

const Calendar = () => {
    const { calendarRows, getEventMonth, todayFormatted, selectedDate, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();
    
    const indexItem = useSelector(state => state.modal.selected)
    const dispatch = useDispatch()

    useEffect(() => {
      if(indexItem){
        const newDate = indexItem.split("-")
        getEventMonth(newDate[2], newDate[1], newDate[0])
      }
    }, [indexItem])

  return (
    <div className='calendar'>
        <div className='calendar__header'>
            <Button className='calendar__button button__left' onClick={getPrevMonth}>
                <Arrow />
            </Button>
            <div className='calendar__date'>
                {`${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
            </div>
            <Button className='calendar__button' onClick={getNextMonth}>
                <Arrow />
            </Button>
            <Button className='calendar__today' onClick={() => dispatch(selectModal(todayFormatted))}>
                Сегодня
            </Button>
        </div>
        <table className="calendar__body">
          <tbody>
              {
                Object.values(calendarRows).map((cols, i) => {
                  return <tr key={cols[0].date} className='calendar__cols'>
                    {cols.map((col, index) => (
                        <Day key={col.date} col={col} index={index} i={i} daysShort={daysShort} />
                    ))}
                  </tr>
                })
              }
          </tbody>
        </table>
    </div>
  )
}

export default Calendar
