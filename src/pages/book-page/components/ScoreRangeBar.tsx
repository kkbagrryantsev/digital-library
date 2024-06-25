import React, { useState } from 'react'

import './ScoreRangeBar.scss'

interface ScoreRangeBarProps {
  defaultScore: number
  maxScore: number
  onScoreChange: (score: number) => void
}

export const ScoreRangeBar: React.FC<ScoreRangeBarProps> = ({
  maxScore = 5,
  defaultScore = 0,
  onScoreChange
}) => {
  const [score, setScore] = useState<number | undefined>(undefined)
  const [previewScore, setPreviewScore] = useState(defaultScore)

  // TODO Add proper typing
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const handleClick = (event): void => {
    const { left, width } = event.currentTarget.getBoundingClientRect()
    const clickPosition = event.clientX - left
    const newScore = Math.round((clickPosition / width) * maxScore)
    setScore(newScore)
    console.log(newScore)
    onScoreChange(newScore)
  }

  const handleHover = (event: any): void => {
    const { left, width } = event.currentTarget.getBoundingClientRect()
    const hoverPosition = event.clientX - left
    const newScore = Math.round((hoverPosition / width) * maxScore)
    setPreviewScore(newScore)
  }

  return (
    <div
      className="w-[100px] min-w-[100px] score-range-bar"
      onClick={handleClick}
      onMouseMoveCapture={handleHover}>
      <div
        className="filled"
        style={{ width: `${((score ?? previewScore) / maxScore) * 100}%` }}
      />
    </div>
  )
}
