import React, { useState } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'
import { clsx } from 'clsx'
import { capitalise } from '@lib/utils'

interface Option<T, U> {
  id: T
  name: U
}

interface NiceSelectProps<T extends FieldValues, U, V> {
  options: Option<U, V>[]
  name: keyof T
  setValue: UseFormSetValue<T>
}

const NiceSelect = <T extends FieldValues, U = string, V = string>({
  options,
  name,
  setValue,
}: NiceSelectProps<T, U, V>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])

  const handleOptionClick = (option: Option<U, V>) => {
    setSelectedOption(option)
    // @ts-expect-error TS2345: Argument of type keyof T is not assignable to parameter of type Path<T>
    setValue(name, option.id)
    setIsOpen(false)
  }

  return (
    <div
      className={clsx('nice-select wide', { open: isOpen })}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="current">{selectedOption.name}</span>
      <ul className="list">
        <li className="option">Select {capitalise(name as string)}</li>
        {options.map((option, index) => (
          <li
            key={index}
            className={clsx('option', {
              focus: option.id === selectedOption.id,
            })}
            onClick={() => handleOptionClick(option)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NiceSelect
