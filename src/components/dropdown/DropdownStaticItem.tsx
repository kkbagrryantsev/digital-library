import React from 'react'

import '~/components/dropdown/styles/Dropdown.scss'

interface DropdownStaticItemProps {
  children: React.ReactNode
}

export const DropdownStaticItem: React.FC<DropdownStaticItemProps> = ({
  children
}: DropdownStaticItemProps) => {
  return <div className={'dropdownMenu__dropdownStaticItem'}>{children}</div>
}
