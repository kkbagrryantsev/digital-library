import React, { type BaseSyntheticEvent, useEffect, useState } from 'react'
import { Facet } from '~/enums/Facet.ts'
import useBoundStore from '~/store/useBoundStore.ts'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { AutoResizableTextArea } from '~/components/auto-resizable-textarea/AutoResizableTextArea.tsx'

interface FacetSearchBarProps {
  initialFacet: Facet
}

const facetNameMapping: { [key in Facet]: string } = {
  [Facet.DATA]: 'Содержание',
  [Facet.GENRE]: 'Жанр',
  [Facet.AUTHOR]: 'Автор',
  [Facet.SCORE]: 'Рейтинг',
  [Facet.DESCRIPTION]: 'Описание',
  [Facet.ISBN]: 'ISBN',
  [Facet.TITLE]: 'Название'
}

const searchPlaceholderMapping: { [key in Facet]: string } = {
  [Facet.DATA]: 'про русскую душу, тоску и отчаяние',
  [Facet.GENRE]: 'русская проза',
  [Facet.AUTHOR]: 'Федор Михайлович Достоевский',
  [Facet.SCORE]: 'число от 1 до 5',
  [Facet.DESCRIPTION]: 'самый известный роман',
  [Facet.ISBN]: '978-5-699-43798-6',
  [Facet.TITLE]: 'Коллекционер'
}

export const FacetSearchBar: React.FC<FacetSearchBarProps> = ({
  initialFacet
}: FacetSearchBarProps) => {
  const [availableFacets, setAvailableFacets] = useState<Facet[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [currentFacet, setCurrentFacet] = useState<Facet>(initialFacet)
  const addFacetSearchText = useBoundStore(state => state.addFacetSearchText)
  const facetSearchText = useBoundStore(state => state.facetSearchText)
  const removeFacetSearchText = useBoundStore(
    state => state.removeFacetSearchText
  )

  useEffect(() => {
    const allFacets = Object.values(Facet)
    const usedFacets = Array.from(facetSearchText.keys())
    setAvailableFacets(
      allFacets.filter(
        value => !usedFacets.includes(value) || value === currentFacet
      )
    )
    console.log(availableFacets)
  }, [facetSearchText])

  const getNextFacet = (facet: Facet): Facet => {
    const currentIndex = availableFacets.indexOf(facet)
    const nextIndex = (currentIndex + 1) % availableFacets.length
    return availableFacets[nextIndex]
  }

  const getPreviousFacet = (facet: Facet): Facet => {
    const currentIndex = availableFacets.indexOf(facet)
    const previousIndex =
      (currentIndex - 1 + availableFacets.length) % availableFacets.length
    return availableFacets[previousIndex]
  }

  const setPreviousFacet = (): void => {
    const previousFacet = getPreviousFacet(currentFacet)
    removeFacetSearchText(currentFacet)
    setCurrentFacet(previousFacet)
    addFacetSearchText(previousFacet, '')
    setSearchText('')
  }

  const setNextFacet = (): void => {
    const nextFacet = getNextFacet(currentFacet)
    removeFacetSearchText(currentFacet)
    setCurrentFacet(nextFacet)
    addFacetSearchText(nextFacet, '')
    setSearchText('')
  }

  const onInput = (event: BaseSyntheticEvent): void => {
    setSearchText(event.target.value)
    addFacetSearchText(currentFacet, event.target.value)
  }

  return (
    <div className={'searchBar'}>
      <div className={'flex flex-row'}>
        <button
          onClick={() => {
            setPreviousFacet()
          }}
          className={'bg-transparent'}>
          <MdChevronLeft
            size={35}
            className={
              'fill-gray-400 hover:fill-black transition duration-300 ease-in-out'
            }
          />
        </button>
        <h3 className={'w-52'}>{facetNameMapping[currentFacet]}</h3>
        <button
          onClick={() => {
            setNextFacet()
          }}
          className={'bg-transparent'}>
          <MdChevronRight
            size={35}
            className={
              'fill-gray-400 hover:fill-black transition duration-300 ease-in-out'
            }
          />
        </button>
      </div>
      <AutoResizableTextArea
        rows={2}
        onInput={onInput}
        value={searchText}
        className={'searchBar__textarea'}
        placeholder={searchPlaceholderMapping[currentFacet]}
      />
    </div>
  )
}
