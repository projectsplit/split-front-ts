import { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { HiX } from 'react-icons/hi'
import { StyledLabelSelect } from './LabelPicker.styled'
import { Label, LabelPickerProps } from '../../types'
import tinycolor from 'tinycolor2'

type FormLabel = {
  id: string,
  text: string,
  color: string,
  selected: boolean
}

type FormLabels = Record<string, FormLabel>

function changeAlphaValue(color: string, alpha: number) {
  const r = parseInt(color.substring(1, 3), 16)
  const g = parseInt(color.substring(3, 5), 16)
  const b = parseInt(color.substring(5, 7), 16)

  return `rgba(${r},${g},${b},${alpha})`
}

export const LabelPicker = ({ labels, setLabels }: LabelPickerProps) => {

  // const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>(props.selectedLabelIds)

  // const colors = [
  //   '#66D9D9', // 30% desaturated #00FFFF
  //   '#59B267', // 30% desaturated #32CD32
  //   '#FF82B1', // 30% desaturated #FF69B4
  //   '#CCB050', // 30% desaturated #FFD700
  //   '#608CCE', // 30% desaturated #1E90FF
  //   '#CC8A8A', // 30% desaturated #F08080
  //   '#AE89C1', // 30% desaturated #9370DB
  //   '#FF6340', // 30% desaturated #FF4500
  //   '#85AE51', // 30% desaturated #9ACD32
  //   '#4D9ECC'  // 30% desaturated #00BFFF
  // ]

  // const labelData: Label[] = [
  //   { id: 'c43e1df2-5f6f-461f-9146-d087a55248e2', color: colors[0], text: 'Clothes' },
  //   { id: 'c43e1df2-5f6f-461f-9146-d087a55248e1', color: colors[1], text: 'Food' },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea64', color: colors[2], text: 'Drinks' },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea61', color: colors[3], text: 'Gas' },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea65', color: colors[4], text: 'Accommodation' },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea66', color: colors[5], text: 'Tickets' },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea67', color: colors[6], text: 'Market' },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea68', color: colors[7], text: 'Train' },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea69', color: colors[8], text: 'Bus' },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea6a', color: colors[9], text: 'Boat' }
  // ]

  const clickOutsideListener = (event: MouseEvent) => {
    if (dropdownRef.current
      && !dropdownRef.current.contains(event.target as Node)
      && mainRef.current
      && !mainRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideListener)
    return () => {
      document.removeEventListener('mousedown', clickOutsideListener)
    }
  }, [])

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  const selectLabel = (selectedId: string): void => {

    let newFormLabels = { ...labels }

    if (newFormLabels[selectedId]) {
      newFormLabels[selectedId] = {
        ...newFormLabels[selectedId],
        selected: true
      }
      setLabels(newFormLabels)
      setIsMenuOpen(false)
    }
  }

  const deselectMember = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string): void => {
    e.stopPropagation()

    let newFormLabels = { ...labels }

    if (newFormLabels[id]) {
      newFormLabels[id] = {
        ...newFormLabels[id],
        selected: false,
      }
      setLabels(newFormLabels)
      setIsMenuOpen(false)
    }
  }

  const selectNone = (): void => {
    const newFormLabels: FormLabels = Object.entries(labels).reduce((acc, [id, label]) => {
      acc[id] = { ...label, selected: false }
      return acc
    }, {} as FormLabels)

    setLabels(newFormLabels)
    setIsMenuOpen(false)
  }

  const selectedCount = Object.values(labels).filter(p => p.selected).length
  const allCount = Object.values(labels).length
  const allSelected = selectedCount == allCount

  return (
    <StyledLabelSelect>
      <div className='main' onClick={() => setIsMenuOpen(!isMenuOpen)} ref={mainRef}>
        <div className='text'>
          {selectedCount == 0 && 'Select...'}
        </div>
        <div className='left'>
          {Object.entries(labels)
            .filter(([_, label]) => label.selected)
            .map(([id, label]) =>
              <div
                key={id}
                className='selected-label'
                onClick={(e) => deselectMember(e, id)}
                style={{ backgroundColor: tinycolor(label.color).setAlpha(0.08).toRgbString(), color: label.color }}
              >
                <div className='label-text'>{label.text}</div>
                <HiX className='x-icon' />
              </div>
            )
          }
        </div>
        <FiChevronDown className='icon' />
      </div>
      {isMenuOpen && <div className='dropdown' ref={dropdownRef}>
        {selectedCount > 0 &&
          <div className='available option' onClick={e => selectNone()}>
            <div className='select-all'>{'Clear'}</div>
          </div>
        }
        {Object.entries(labels).filter(([id, label]) => !label.selected).map(([id, label]) =>
          <div key={id} className='available option' onClick={e => selectLabel(id)} style={{ borderColor: label.color, color: label.color }}>
            <div className='text'>{label.text}</div>
          </div>
        )}
      </div>}
    </StyledLabelSelect>
  )
}