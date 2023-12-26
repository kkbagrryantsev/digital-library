import React from 'react'
import './styles/GoBack.scss'

interface GoBackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to: string
}

export const GoBack: React.FC<GoBackProps> = (props) => {
  const { to } = props

  // const handleButtonClick = (_event: any): void => {
  //   const origin = window.location.origin
  //
  //   onClick?.(_event)
  // }

  return <a className={'goBack'} href={to}>← Вернуться</a>
}
