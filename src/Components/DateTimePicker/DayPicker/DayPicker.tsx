import { DayPickerProps } from '../../../types'
import { StyledDayPicker } from './DayPicker.styled'
import dayjs from 'dayjs'

const DayPicker = (props: DayPickerProps) => {
  const { selectedDateTime, setSelectedDateTime } = props

  const startOfTheWeek = 0
  const month = selectedDateTime.month()
  const year = selectedDateTime.year()

  const now = dayjs()

  const getDayNames = (offset: number): string[] => (
    Array.from({ length: 7 }, (_, i) =>
      dayjs().day((i + offset) % 7).format('dd')
    )
  )

  const firstDayOfMonth = dayjs().set('year', year).set('month', month).set('date', 1)
  const calendarStart = firstDayOfMonth.startOf('week')

  const calendarGrid =
    Array.from({ length: 6 }, (_, i) =>
      Array.from({ length: 7 }, (_, j) =>
        calendarStart.add(i * 7 + j, 'day')))

  return (
    <StyledDayPicker>
      <div className='names-row'>
        {getDayNames(startOfTheWeek).map(n => <div key={n} className='day-name'>{n}</div>)}
      </div>
      <div className='month-grid'>
        {calendarGrid.map((week, i) =>
          <div key={i} className='week-row'>
            {week.map((day, j) => <div
              key={j}
              className={`day${day.month() != month ? ' inactive' : ''}${day.isSame(now, 'date') ? ' today' : ''}${day.isSame(selectedDateTime, 'date') ? ' selected' : ''}`}
              onClick={() => setSelectedDateTime(prev => day.set('hours', prev.hour()).set('minutes', prev.minute()))}
            >
              {day.date()}
            </div>)}
          </div>)}
      </div>
    </StyledDayPicker>
  )
}

export default DayPicker