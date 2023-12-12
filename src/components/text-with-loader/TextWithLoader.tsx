import React from 'react'
import LoadingState from '~/enums/LoadingState.ts'
import TextLoadingAnimation, {
  type TextLoadingAnimationParams
} from '~/components/text-loading-animation/TextLoadingAnimation.tsx'
import classnames from 'classnames'

const headingOptions = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

type HeadingOption = typeof headingOptions[number]

interface HeadingWithLoaderProps
  extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
  > {
  fs: HeadingOption
  loading: LoadingState
  animationparams?: TextLoadingAnimationParams
  animate?: boolean
  loadingplaceholder: string
  errorplaceholder: string
  loadingclassname?: string
  errorclassname?: string
}

const getHeadingElement = (headingOption: HeadingOption, props: HeadingWithLoaderProps): React.ReactNode => {
  switch (headingOption) {
    case 'h1':
      return <h1 {...props}>{props.children}</h1>
    case 'h2':
      return <h2 {...props}>{props.children}</h2>
    case 'h3':
      return <h3 {...props}>{props.children}</h3>
    case 'h4':
      return <h4 {...props}>{props.children}</h4>
    case 'h5':
      return <h5 {...props}>{props.children}</h5>
    case 'h6':
      return <h6 {...props}>{props.children}</h6>
  }
}

export const HeadingWithLoader: React.FC<HeadingWithLoaderProps> = (
  props: HeadingWithLoaderProps
) => {
  const {
    fs,
    loading,
    animate,
    animationparams,
    className,
    loadingplaceholder,
    errorplaceholder,
    loadingclassname,
    errorclassname
  } = props

  switch (loading) {
    case LoadingState.LOADING:
      if (animate === true) {
        return <TextLoadingAnimation className={classnames(loadingclassname, className)} {...animationparams} placeholdertext={loadingplaceholder}/>
      } else {
        return getHeadingElement(fs, { ...props, children: loadingplaceholder, className: classnames(loadingclassname, className) })
      }
    case LoadingState.LOADED:
      return getHeadingElement(fs, props)
    case LoadingState.ERROR:
      if (animate === true) {
        return <TextLoadingAnimation className={classnames(errorclassname, className)} {...animationparams} placeholdertext={errorplaceholder}/>
      } else {
        return getHeadingElement(fs, { ...props, children: errorplaceholder, className: classnames(errorclassname, className) })
      }
  }
}

HeadingWithLoader.defaultProps = {
  animate: true
}
