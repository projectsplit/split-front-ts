import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { StyledMultiSelection } from './MultiSelection.styled'
import { IoLockClosed } from 'react-icons/io5'
import { FiChevronDown } from 'react-icons/fi'
import { LuLock, LuUnlock } from 'react-icons/lu'
import { RiLock2Line, RiLockLine, RiCloseLine } from 'react-icons/ri'
import { HiLockClosed, HiLockOpen, HiOutlineLockClosed, HiTrash } from 'react-icons/hi'

// type Option = {
//   key: string
//   value: {
//     name: string,
//     amount: string
//   }
// }
type Option = {
  key: string
  value: string
}

type SelectedParticipant = {
  id: string
  name: string
  amount: string
}

type AvailableMember = {
  id: string
  name: string
}

type FormParticipant = {
  id: string
  name: string
  amount: string,
  selected: boolean,
  locked: boolean
}

export default function MultiSelection() {

  const formParticipants: FormParticipant[] = [
    { id: 'c43e1df2-5f6f-461f-9146-d087a55248e1', name: 'Krisasdasdasd', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea64', name: 'Mont', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea61', name: 'Kont', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea65', name: 'Mari', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea66', name: 'Luig', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea67', name: 'Koji', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea68', name: 'Wasi', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea69', name: 'Pjot', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea6a', name: 'Lent', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea6b', name: 'Mimi', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea6c', name: 'Pipi', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea6d', name: 'Lelo', amount: '', locked: false, selected: false },
    { id: '50d3c88a-c31b-4194-ade2-93866b90ea6e', name: 'Miou', amount: '', locked: false, selected: false }
  ]

  const clickOutsideListener = (event: MouseEvent) => {
    if (participantDropdownRef.current
      && !participantDropdownRef.current.contains(event.target as Node)
      && mainRef.current
      && !mainRef.current.contains(event.target as Node)
    ) {
      setIsParticipantMenuOpen(false)
    }
  }

  useEffect(() => {
    const members = new Map<string, FormParticipant>()
    formParticipants.forEach(p => {
      members.set(p.id, { id: p.id, name: p.name, amount: p.amount, locked: p.locked, selected: p.selected })
    })
    setFormParticipantMap(members)

    document.addEventListener("mousedown", clickOutsideListener)
    return () => {
      document.removeEventListener("mousedown", clickOutsideListener)
    }
  }, [])

  const [formParticipantMap, setFormParticipantMap] = useState<Map<string, FormParticipant>>(new Map<string, FormParticipant>())
  const [isParticipantMenuOpen, setIsParticipantMenuOpen] = useState(false)
  const participantDropdownRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  const selectParticipant = (id: string): void => {
    const p = formParticipantMap.get(id) as FormParticipant
    setFormParticipantMap(new Map(formParticipantMap.set(id, { ...p, amount: getRandomDecimal(), selected: true })))
  }

  const deselectParticipant = (id: string): void => {
    const p = formParticipantMap.get(id) as FormParticipant
    setFormParticipantMap(new Map(formParticipantMap.set(id, { ...p, amount: getRandomDecimal(), selected: false })))
  }

  const toggleLock = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string): void => {
    e.stopPropagation()
    const p = formParticipantMap.get(id) as FormParticipant
    setFormParticipantMap(new Map(formParticipantMap.set(id, { ...p, locked: !p.locked })))
  }

  const selectAll = (): void => {
    formParticipantMap.forEach((p, id, map) => {
      map.set(id, { ...p, selected: true, amount: getRandomDecimal() })
    })
    setFormParticipantMap(new Map(formParticipantMap))
  }

  const changeAmount = (id: string, amount: string): void => {
    const p = formParticipantMap.get(id) as FormParticipant
    setFormParticipantMap(new Map(formParticipantMap.set(id, { ...p, amount: amount })))
  }

  function getRandomDecimal(): string {
    let randomDecimal = Math.random();
    let fixedTwoDecimal = parseFloat((randomDecimal * 100).toFixed(2));
    return fixedTwoDecimal.toString();
  }

  console.log('formParticipantMap')
  console.log(Array.from(formParticipantMap).filter(([id, p]) => !p.selected))
  console.log('')

  const selectedParticipantsCount = Array.from(formParticipantMap).filter(([id, p]) => p.selected).length

  return (
    <StyledMultiSelection>
      <div className='main' onClick={() => setIsParticipantMenuOpen(!isParticipantMenuOpen)} ref={mainRef}>
        <div className='text'>
          {selectedParticipantsCount > 0 ? selectedParticipantsCount + ' selected' : 'Select...'}
        </div>
        <FiChevronDown className='icon' />
        {/* <HiLockClosed />
        <HiLockOpen /> */}
      </div>
      {isParticipantMenuOpen && <div className='dropdown' ref={participantDropdownRef}>
        <div className='available option' onClick={e => selectAll()}>
          <div className='select-all'>Select all</div>
        </div>
        {Array.from(formParticipantMap).filter(([id, p]) => p.selected).map(([id, p]) =>
          <div key={id} className='selected option' onClick={() => deselectParticipant(id)}>
            <div className='text'>{p.name}</div>
            <div className='right'>
              <div className='currency'>€</div>
              <input
                className='amount'
                inputMode='decimal'
                value={p.amount}
                onChange={e => changeAmount(id, e.target.value)}
                onClick={e => e.stopPropagation()}
              // onFocus={e => e.target.select()}
              />
              <div onClick={e => toggleLock(e, id)}>
                {p.locked ? <HiLockClosed className='locked-icon' /> : <HiLockOpen className='unlocked-icon' />}
              </div>
            </div>
          </div>
        )}
        {Array.from(formParticipantMap).filter(([id, p]) => !p.selected).map(([id, member]) =>
          <div key={id} className='available option' onClick={e => selectParticipant(id)}>
            <div className='text'>{member.name}</div>
          </div>
        )}
      </div>}
    </StyledMultiSelection>
  )
}