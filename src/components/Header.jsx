import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import MiniModal from './MiniModal'
import {ReactComponent as Search} from '../assets/search.svg'
import {ReactComponent as Cancel} from '../assets/cancel.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateItem } from '../redux/modalSlice'
import SearchModal from './SearchModal'


const Header = () => {
  const [active, setActive] = useState(false)
  const [activeSearch, setActiveSearch] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef()
  const addModal = useRef()
  const inputRef = useRef(null);

  const search = (data) => {
    return data.filter((item) => item.event.toLowerCase().includes(query))
  }

  const dispatch = useDispatch()
  const indexItem = useSelector(state => state.modal.selected)

  const updateEvent = () => {
    dispatch(updateItem(indexItem))
  }

  const hideSearchModal = (e) => {
    setActiveSearch(false)
  }

  const clearInput = () => {
    setQuery('');
    searchRef.current?.focus();
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(!e.path.includes(searchRef.current)){
        setActiveSearch(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(!e.path.includes(addModal.current)){
        setActive(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className='header' >
        <div className='header__body'>
            <div className='header__buttons'ref={addModal} >
                <Button 
                  className='header__button' 
                  onClick={() => setActive(true)}
                >Добавить</Button>
                <Button 
                  className='header__button' 
                  onClick={updateEvent}
                >Обновить</Button>
                <div >
                  <MiniModal active={active} setActive={setActive} />
                </div>
            </div>
            <div className='header__input' >
              <div>
                <Search />
              </div>
              <div className='header__search_modal' ref={searchRef}>
                <Input
                  onClick={() => setActiveSearch(true)} 
                  value={query} 
                  onChange={e => setQuery(e.target.value)} 
                  placeholder='Событие, дата или участник'
                  className='input'
                />
                <div 
                  className={`header__search_cancel ${query ? 'active_cancel' : ''}`} 
                  onClick={clearInput}
                >
                  <Cancel />
                </div>
                <SearchModal 
                  hideSearchModal={hideSearchModal} 
                  search={search} 
                  active={activeSearch} 
                />
              </div>
            </div>
            
        </div>
    </div>
  )
}

export default Header
