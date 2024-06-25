import React from 'react'
import { ProtectedElement } from '~/components/protected-element/ProtectedElement.tsx'
import useBoundStore from '~/store/useBoundStore.ts'
import './styles/AuthForm.scss'
import { Controller, useForm } from 'react-hook-form'

const AuthForm: React.FC = () => {
  const { control, handleSubmit } = useForm()
  const signOut = useBoundStore(state => state.signOut)
  const signIn = useBoundStore(state => state.signIn)

  const onSubmit = (data: any): void => {
    void signIn(data)
  }

  const signOutHandler = (): void => {
    void signOut()
  }

  return (
    <>
      <ProtectedElement policy={'authenticatedOnly'}>
        <button className={'signOutButton'} onClick={signOutHandler}>
          Выйти
        </button>
      </ProtectedElement>
      <ProtectedElement policy={'unauthenticatedOnly'}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)} className={'authForm'}>
          <h5 className={'authForm__hint'}>Логин</h5>
          <Controller
            control={control}
            render={({ field }) => <input className={'authForm__input'} {...field} />}
            name={'login'}
            defaultValue={''}>
          </Controller>
          <h5 className={'authForm__hint'}>Пароль</h5>
          <Controller
            control={control}
            render={({ field }) => <input type={'password'} className={'authForm__input'} {...field} />}
            name={'password'}
            defaultValue={''}>
          </Controller>
          <button className={'signOutButton'}>Войти</button>
        </form>
      </ProtectedElement>
    </>
  )
}

export default React.memo(AuthForm)
