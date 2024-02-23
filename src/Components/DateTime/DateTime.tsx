import { useEffect, useRef, useState } from 'react'
import { StyledDateTime, } from './DateTime.styled'
import dayjs from 'dayjs'
import { DateTimeProps } from '../../types'
import DateTimePicker from '../DateTimePicker/DateTimePicker'

export const DateTime = ({ selectedDateTime, setSelectedDateTime }: DateTimeProps) => {

  const [showPicker, setShowPicker] = useState<boolean>(false)
  const [realtimeUpdate, setRealtimeUpdate] = useState<boolean>(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (realtimeUpdate) {
      interval = setInterval(() => {
        setSelectedDateTime(prev => {
          const now = dayjs()
          return prev.set('hours', now.hour()).set('minutes', now.minute()).set('seconds', now.second())
        }
        )
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [realtimeUpdate])

  useEffect(() => {
    window.addEventListener('mousedown', (e) => closeTimePicker(e))
    
    return () => {
      window.removeEventListener('mousedown', closeTimePicker)
    }
  }, [])

  const closeTimePicker = (event: any) => {
    if (!ref.current) return
    if (ref.current.contains(event.target)) return
    setShowPicker(false)
  }

  return (
    <StyledDateTime ref={ref}>
      <div className='text' onClick={() => setShowPicker(!showPicker)}>
        <div className='date'>{selectedDateTime.format('dddd, DD MMM YYYY HH:mm')}</div>
      </div>
      {showPicker &&
        <DateTimePicker
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
          realtimeUpdate={realtimeUpdate}
          setRealtimeUpdate={setRealtimeUpdate}
        />}
    </StyledDateTime>
  )
}