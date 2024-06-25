import React, { useId, useState } from 'react'
import useBoundStore from '~/store/useBoundStore.ts'
import { FacetSearchBar } from '~/pages/search-page/components/search-bar/FacetSearchBar.tsx'
import { Facet } from '~/enums/Facet.ts'

export const SearchBar: React.FC = () => {
  const [facetSearchBars, setFacetSearchBars] = useState([
    <FacetSearchBar initialFacet={Facet.DATA} key={useId()}></FacetSearchBar>
  ])
  const facetSearchText = useBoundStore(state => state.facetSearchText)
  const addFacetSearchText = useBoundStore(state => state.addFacetSearchText)
  const searchBooks = useBoundStore(state => state.searchBooks)

  const addFacetSearchBar = (): void => {
    const allFacets = Object.values(Facet)
    const usedFacets = Array.from(facetSearchText.keys())
    const availableFacets = allFacets.filter(
      value => !usedFacets.includes(value)
    )
    const newFacet = availableFacets[0]
    addFacetSearchText(newFacet, '')
    const newFacetSearchBar = (
      <FacetSearchBar initialFacet={newFacet}></FacetSearchBar>
    )
    setFacetSearchBars(prevState => [...prevState, newFacetSearchBar])
  }

  const handleSubmit = (): void => {
    const facets = []
    for (const entry of facetSearchText.entries()) {
      facets.push({ strategy: entry[0], searchText: entry[1] })
    }
    void searchBooks(facets)
  }

  return (
    <div className={'flex flex-row gap-5'}>
      <div className={'flex flex-col w-full'}>
        <div className={'searchBar'}>
          {facetSearchBars}
          {/* TODO Add proper facet button */}
          <button
            onClick={() => {
              addFacetSearchBar()
            }}>
            Добавить фасет
          </button>
          {/* <FacetSearchBar initialFacet={Facet.DATA}></FacetSearchBar> */}
        </div>
        <div className={'bg-gray-300 h-0.5'} />
      </div>
      <button className={'addBookButton h-100 w-min'} onClick={handleSubmit}>
        <h4 className={'rotate-90 w-full text-gray-700'}>Найти</h4>
      </button>
    </div>
  )
}
