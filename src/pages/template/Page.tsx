import React from 'react'

interface PageProps {
  children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ children }: PageProps) => {
  return <>{children}</>
}

export default React.memo(Page)
