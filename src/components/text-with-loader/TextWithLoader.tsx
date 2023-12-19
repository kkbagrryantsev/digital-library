import React from 'react'
import { ComponentWithLoader } from '~/components/component-with-loader/ComponentWithLoader.tsx'
import classnames from 'classnames'
import { type LoadingState } from '~/enums/LoadingState.ts'

type HeadingOption = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface TextWithLoaderProps
  extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
  > {
  as: HeadingOption
  loading: LoadingState
  loadingplaceholder: string
  errorplaceholder: string
  loadingclassname?: string
  errorclassname?: string
}

const getHeadingElement = (
  as: HeadingOption,
  props: TextWithLoaderProps
): React.ReactNode => {
  switch (as) {
    case 'h1':
      return <h1 {...props} />
    case 'h2':
      return <h2 {...props} />
    case 'h3':
      return <h3 {...props} />
    case 'h4':
      return <h4 {...props} />
    case 'h5':
      return <h5 {...props} />
    case 'h6':
      return <h6 {...props} />
  }
}

export const TextWithLoader: React.FC<TextWithLoaderProps> = props => {
  const {
    loading,
    as,
    loadingplaceholder,
    loadingclassname,
    errorplaceholder,
    errorclassname,
    className
  } = props
  const loadingProps = {
    ...props,
    children: loadingplaceholder,
    className: classnames(loadingclassname, className)
  }
  const errorProps = {
    ...props,
    children: errorplaceholder,
    className: classnames(errorclassname, className)
  }
  return (
    <ComponentWithLoader
      loading={loading}
      onLoading={getHeadingElement(as, loadingProps)}
      onError={getHeadingElement(as, errorProps)}>
      {getHeadingElement(as, props)}
    </ComponentWithLoader>
  )
}
