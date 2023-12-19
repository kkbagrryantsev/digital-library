// noinspection SpellCheckingInspection

import { useState, useEffect } from 'react'
import './TextLoadingAnimation.scss'

export interface RandomSymbolAnimationConfig {
  locale?: 'ru' | 'en'
  alpha?: boolean
  num?: boolean
  special?: boolean
  textCase?: 'upper' | 'lower' | 'as-typed'
}

export function useRandomSymbolAnimation (
  text: string,
  config: RandomSymbolAnimationConfig
): string {
  let symbols = ''

  const localeAlphabetSymbols = {
    ru: 'абвгдеёжзийклмнопрстуфхцчшщьыъэюя',
    en: 'abcdefghijklmnopqrstuvwxyz'
  }
  const numericalSymbols = '0123456789'
  const specialSymbols = '!@#$%^&*'

  const { alpha = true, locale = 'ru', num = true, special = true, textCase = 'as-typed' } = config

  if (alpha) {
    if (textCase === 'upper') {
      symbols += localeAlphabetSymbols[locale].toUpperCase()
    } else if (textCase === 'lower') {
      symbols += localeAlphabetSymbols[locale].toLowerCase()
    } else {
      symbols += localeAlphabetSymbols[locale].toUpperCase()
      symbols += localeAlphabetSymbols[locale].toLowerCase()
    }
  }
  if (num) {
    symbols += numericalSymbols
  }
  if (special) {
    symbols += specialSymbols
  }

  const getRandomSymbol = (): string => {
    return symbols[Math.floor(Math.random() * symbols.length)]
  }

  const [displayedText, setDisplayedText] = useState<string>(text)

  useEffect(() => {
    const intervalId = setInterval(() => {
      let charIndex = Math.floor(Math.random() * text.length)
      while (text[charIndex] === ' ') {
        charIndex = Math.floor(Math.random() * text.length)
      }
      const updatedText =
        displayedText.slice(0, charIndex) +
        getRandomSymbol() +
        displayedText.slice(charIndex + 1)

      setDisplayedText(updatedText)
    }, 50) // Adjust the interval as needed

    return () => {
      clearInterval(intervalId)
    } // Cleanup the interval on component unmount
  }, [displayedText, text])

  return displayedText
}
