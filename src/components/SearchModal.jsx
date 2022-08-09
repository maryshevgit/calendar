import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectModal } from '../redux/modalSlice'
import {ReactComponent as Arrow} from '../assets/arrow.svg'

const SearchModal = ({ active, search }) => {
  const selectItem = useSelector(state => state.modal.selectItem)
  const dispatch = useDispatch()
  console.log(selectItem)
  
    const selectEvent = (id) => {
        dispatch(selectModal(id))
    }

    return (
        <div className={`search__modal ${active && selectItem.length !== 0 ? 'active' : ''}`}  >
            <div className='search_modal__arrow'>
                <Arrow />
            </div>
            <div className='modal__body search_modal__body'>
                {search(selectItem).map(item =>
                    <div className='search_modal__info' 
                         onClick={() => selectEvent(item.select)}
                         key={item.select}
                    >
                        <div className='search_modal__event'>
                            {item.event}
                        </div>
                        <div className='search_modal__date'> 
                            {item.select}
                        </div>
                    </div>
                )}
            </div>
        </div>
      )
}

export default SearchModal
