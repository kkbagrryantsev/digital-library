import React, { type HTMLProps } from 'react'
import './styles/PageHeader.scss'

interface PageHeaderProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
  const { children } = props

  return <div className={'pageHeader'}>{children}</div>
}

export default React.memo(PageHeader)
