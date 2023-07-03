import { DropdownOption } from '@renderer/types'
import { useState, useEffect, useRef } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { v4 as uuid } from 'uuid'

type DropdownProps = {
  buttonSize?: string
  buttonTitle: string | React.ReactNode
  sectionTitle: string
  sectionSize?: string
  options: DropdownOption[]
}

export default function Dropdown({
  buttonTitle,
  sectionTitle,
  buttonSize,
  sectionSize,
  options
}: DropdownProps) {
  const [isSectionOpened, setDropdownSection] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdownSection()
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  function closeDropdownSection() {
    setDropdownSection(false)
  }

  return (
    <div
      ref={dropdownRef}
      className={`${buttonSize ? buttonSize : 'w-40 '} h-fit relative bg-woodsmoke-900 flex`}
    >
      <button
        className="flex-auto flex text-left border-[1px] border-woodsmoke-800 hover:border-woodsmoke-600 focus:border-woodsmoke-500 p-2 px-3 rounded items-center justify-between shadow-sm text-sm"
        onClick={() => setDropdownSection((prev) => !prev)}
      >
        <span className="font-medium ">{buttonTitle}</span>
        <div className="w-[1px] h-[50%] bg-woodsmoke-800"></div>
        <i className={`transition-all ${isSectionOpened ? 'rotate-180' : ''}`}>
          <BiChevronDown size={20} />
        </i>
      </button>

      {isSectionOpened && (
        <div
          className={`${
            sectionSize ? sectionSize : 'w-56 '
          } absolute top-[120%] right-0 bg-woodsmoke-900 py-3 rounded border-[1px] z-20 border-woodsmoke-800 shadow-sm`}
        >
          <h1 className="font-semibold mb-3.5 px-4 text-sm">{sectionTitle}</h1>

          <div className="flex flex-col items-start">
            {options.map((option) => {
              return (
                <button
                  key={uuid()}
                  onClick={() => {
                    closeDropdownSection()
                    option.clickFn()
                  }}
                  className="w-full h-11 text-left hover:bg-woodsmoke-800 rounded px-4 focus:bg-woodsmoke-700 text-sm"
                >
                  {option.text}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
