import React from 'react'
import './styles/BookPageContent.scss'
import useBoundStore from '~/store/useBoundStore.ts'
import { HeadingWithLoader } from '~/components/text-with-loader/TextWithLoader.tsx'
import LoadingState from '~/enums/LoadingState.ts'

// interface TextWithLoaderProps {
//   children: React.ReactNode
//   loading: LoadingState
//   alpha?: boolean
//   num?: boolean
//   textCase?: 'upper' | 'lower'
//   loadingPlaceholderText: string
//   errorPlaceholderText: string
//   loadingClassname: string | undefined
//   errorClassname: string | undefined
// }

// interface TextWithLoaderProps
//   extends React.DetailedHTMLProps<
//   React.HTMLAttributes<HTMLHeadingElement>,
//   HTMLHeadingElement
//   > {
//   fs: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
//   loadingplaceholder: string | undefined
//   errorplaceholder: string | undefined
//   loadingclassname?: string
//   errorclassname?: string
// }

// const withLoader = ({
//
// }) =>

// const Text2WithLoader = ({
//   alpha,
//   num,
//   textCase,
//   loadingPlaceholderText,
//   errorPlaceholderText,
//   loadingClassName,
//   errorClassName
// }) => withLoader()

// const TextWithLoader: React.FC<TextWithLoaderProps> = ({
//   children,
//   loading,
//   alpha,
//   num,
//   textCase,
//   loadingPlaceholderText,
//   errorPlaceholderText,
//   loadingClassname,
//   errorClassname
// }: TextWithLoaderProps) => {
//   return (
//     <ComponentWithLoader
//       loadingState={loading}
//       onLoading={
//         <TextLoadingAnimation
//           alpha={alpha}
//           num={num}
//           textcase={textCase}
//           placeholdertext={loadingPlaceholderText}
//           className={loadingClassname}
//         />
//       }
//       onErrorLoading={
//         <TextLoadingAnimation
//           alpha={alpha}
//           num={num}
//           textcase={textCase}
//           placeholdertext={errorPlaceholderText}
//           className={classnames(loadingClassname, errorClassname)}
//         />
//       }>
//       {children}
//     </ComponentWithLoader>
//   )
// }

const BookPageContent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { loading } = useBoundStore(state => state.book)
  // noinspection SpellCheckingInspection
  const { title, description, author, genre, isbn } = {
    title: 'Игрок',
    author: 'Федор Достоевский',
    genre: 'Классическая проза',
    description:
      '"Достоевским я зачитывался, даже в очень плохих переводах. Позднее я прочитал его по-французски, на французский его переводили русские, их переводы были гораздо лучше испанских. Я думаю, что для любого писателя в мире русские романисты — основа основ..." (Габриэль Гарсиа Маркес)',
    isbn: '978-5-699-43490-9 '
  }

  loading = LoadingState.LOADING

  const authorWithLoader = (): React.ReactNode => {
    return (
      <HeadingWithLoader
        fs={'h4'}
        className={'author'}
        animationparams={{ num: false, textcase: 'upper' }}
        loadingplaceholder={'ИВАН ИВАНОВ'}
        errorplaceholder={'ОШИБКА ЗАГРУЗКИ'}
        errorclassname={'text_modDanger'}
        loading={loading}>
        {author.toUpperCase()}
      </HeadingWithLoader>
      // <TextWithLoader
      //   loading={loading}
      //   num={false}
      //   textCase={'upper'}
      //   loadingPlaceholderText={'ИВАН ИВАНОВ'}
      //   errorPlaceholderText={'ОШИБКА ЗАГРУЗКИ'}
      //   loadingClassname={'author'}
      //   errorClassname={'text_modDanger'}>
      //   <h4 className={'author'}>{author.toUpperCase()}</h4>
      // </TextWithLoader>
    )
  }

  const genreWithLoader = (): React.ReactNode => {
    return (
      <HeadingWithLoader
        fs={'h4'}
        className={'genre'}
        animationparams={{ num: false }}
        loadingplaceholder={'Всемирная литература'}
        errorplaceholder={'Не удалось загрузить'}
        errorclassname={'text_modDanger'}
        loading={loading}>
        {genre}
      </HeadingWithLoader>
      // <TextWithLoader
      //   loading={loading}
      //   num={false}
      //   loadingPlaceholderText={'Всемирная литература'}
      //   errorPlaceholderText={'Не удалось загрузить'}
      //   loadingClassname={'genre'}
      //   errorClassname={'text_modDanger'}>
      //   <h4 className={'genre'}>{genre}</h4>
      // </TextWithLoader>
    )
  }

  const titleWithLoader = (): React.ReactNode => {
    return (
      <HeadingWithLoader
        fs={'h1'}
        className={'title'}
        animate={false}
        loadingplaceholder={'ЗАГРУЗКА'}
        errorplaceholder={'ОШИБКА'}
        errorclassname={'text_modDanger'}
        loading={loading}>
        {title.toUpperCase()}
      </HeadingWithLoader>
      // <TextWithLoader
      //   loading={loading}
      //   num={false}
      //   textCase={'upper'}
      //   loadingPlaceholderText={'ЗАГРУЗКА'}
      //   errorPlaceholderText={'ОШИБКА'}
      //   loadingClassname={'title'}
      //   errorClassname={'text_modDanger'}>
      //   <h1 className={'title'}>{title.toUpperCase()}</h1>
      // </TextWithLoader>
    )
  }

  const descriptionWithLoader = (): React.ReactNode => {
    return (
      <HeadingWithLoader
        fs={'h4'}
        className={'description'}
        animationparams={{ num: false }}
        loadingplaceholder={
          'С хорошей книгой время течет медленнее, словно заключенное в заколдованный мир приключений и глубоких размышлений. Это путешествие сквозь страницы, где каждая буква словно магия, призывающая вас в удивительный мир слов и историй. Давайте вместе откроем дверь в неизведанные миры и насладимся волшебством слов.'
        }
        errorplaceholder={
          'Не удалось загрузить страницу. Попробуйте перезагрузить её'
        }
        errorclassname={'text_modDanger'}
        loading={loading}>
        {description}
      </HeadingWithLoader>
      // <TextWithLoader
      //   loading={loading}
      //   num={false}
      //   loadingPlaceholderText={
      //     'С хорошей книгой время течет медленнее, словно заключенное в заколдованный мир волнующих приключений и глубоких размышлений. Это путешествие сквозь страницы, где каждая буква словно магия, призывающая вас в удивительный мир слов и историй. Давайте вместе откроем дверь в неизведанные миры и насладимся волшебством слов.'
      //   }
      //   errorPlaceholderText={
      //     'Не удалось загрузить страницу. Попробуйте перезагрузить её'
      //   }
      //   loadingClassname={'description'}
      //   errorClassname={'text_modDanger'}>
      //   <h4 className={'description'}>{description}</h4>
      // </TextWithLoader>
    )
  }

  const isbnWithLoader = (): React.ReactNode => {
    return (
      <HeadingWithLoader
        fs={'h4'}
        className={'isbn'}
        animationparams={{ alpha: false }}
        loadingplaceholder={'ISBN 978-5-669-43490-0'}
        errorplaceholder={'ISBN 000-0-000-00000-0'}
        errorclassname={'text_modDanger'}
        loading={loading}>
        {isbn}
      </HeadingWithLoader>
    )
  }

  // const isbnWithLoader = (): React.ReactNode => (
  //   <ComponentWithLoader
  //     loadingState={loading}
  //     onLoading={
  //       <TextLoadingAnimation
  //         alpha={false}
  //         className={'isbn'}
  //         placeholdertext={'ISBN 978-5-669-43490-0'}
  //       />
  //     }
  //     onErrorLoading={
  //       <TextLoadingAnimation
  //         alpha={false}
  //         className={classnames('isbn', 'text_modDanger')}
  //         placeholdertext={'000-0-000-00000-0'}
  //       />
  //     }>
  //     <h4 className={'isbn'}>ISBN {isbn}</h4>
  //   </ComponentWithLoader>
  // )

  return (
    <main className={'bookPageContent'}>
      <div className={'book'}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
          {authorWithLoader()}
          {genreWithLoader()}
        </div>
        {titleWithLoader()}
        <div style={{ width: '400px' }}>
          {descriptionWithLoader()}
        </div>
        <div className={'actions'}></div>
        {isbnWithLoader()}
      </div>
    </main>
  )
}

export default React.memo(BookPageContent)
