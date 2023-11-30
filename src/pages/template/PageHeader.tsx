import React from 'react'

interface PageHeaderProps {
  children: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ children }: PageHeaderProps) => {
  return <>{children}</>
}

export default React.memo(PageHeader)
