import React from 'react'

interface PageContentProps {
  children: React.ReactNode
}

const PageContent: React.FC<PageContentProps> = ({ children }: PageContentProps) => {
  return <>{children}</>
}

export default React.memo(PageContent)
