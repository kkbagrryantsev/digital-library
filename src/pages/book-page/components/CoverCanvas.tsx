import React, { useEffect, useRef } from 'react'

export const CoverCanvas = ({ words }: { words: string[] }): React.JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return
    const ctx = canvas.getContext('2d')
    if (ctx === null) return

    const randomInt = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const drawRotatedText = (
      text: string,
      x: number,
      y: number,
      angle: number
    ): void => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.fillText(text, 0, 0)
      ctx.restore()
    }

    const drawCover = (): void => {
      if (canvas !== null) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = 'bold 32px Roboto, sans-serif'

        words.forEach(word => {
          const x = randomInt(0, canvas.width)
          console.log(canvas.width)
          const y = randomInt(0, canvas.height)
          console.log(canvas.height)
          const angle = 0 // 90 degrees in radians
          ctx.fillStyle = 'red'
          drawRotatedText(word, x, y, angle)
        })
      }
    }

    drawCover()
  }, [words])

  return <canvas height={400} width={400} ref={canvasRef} />
}
