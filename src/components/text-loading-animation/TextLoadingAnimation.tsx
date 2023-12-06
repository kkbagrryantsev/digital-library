// noinspection SpellCheckingInspection

import React, { useState, useEffect } from 'react'
import './TextLoadingAnimation.scss'
import classnames from 'classnames'

interface TextLoadingAnimationProps
  extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
  > {
  alpha?: boolean
  num?: boolean
  placeholdertext: string
  textcase?: 'upper' | 'lower'
}

const TextLoadingAnimation: React.FC<TextLoadingAnimationProps> = (
  props: TextLoadingAnimationProps
) => {
  const {
    alpha,
    num,
    placeholdertext: placeholderText,
    textcase,
    className: customClassName
  } = props

  const [displayedText, setDisplayedText] = useState<string>(placeholderText)

  useEffect(() => {
    const intervalId = setInterval(() => {
      let charIndex = Math.floor(Math.random() * placeholderText.length)
      while (placeholderText[charIndex] === ' ') {
        charIndex = Math.floor(Math.random() * placeholderText.length)
      }
      const updatedText =
        displayedText.slice(0, charIndex) +
        getRandomSymbol() +
        displayedText.slice(charIndex + 1)

      setDisplayedText(updatedText)
    }, 500) // Adjust the interval as needed

    return () => {
      clearInterval(intervalId)
    } // Cleanup the interval on component unmount
  }, [displayedText, placeholderText])

  const nums = '0123456789'
  const russianCharacters =
    'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯфбвгдеёжзийклмнопрстуфхцчшщьыъэюя'

  let characters = ''
  if (alpha === true || alpha === undefined) {
    characters += russianCharacters
  }
  if (num === true || num === undefined) {
    characters += nums
  }
  switch (textcase) {
    case 'upper':
      characters = characters.toUpperCase()
      break
    case 'lower':
      characters = characters.toLowerCase()
      break
    default: {
      /* empty */
    }
  }
  const symbols = ['!', '@', '#', '$', '%', '^', '&', '*']

  // Function to get a random symbol or Russian character (customize as needed)
  const getRandomSymbol = (): string => {
    const randomArray = Math.random() < 0.7 ? characters : symbols
    return randomArray[Math.floor(Math.random() * randomArray.length)]
  }

  return <p className={classnames('text-loading-animation', customClassName)} {...props}>{displayedText}</p>
}

export default TextLoadingAnimation
