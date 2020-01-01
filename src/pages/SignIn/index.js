import React, { useState } from 'react'
import { Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { signInRequest } from '~/store/modules/auth/actions'

import logo from '~/assets/logo.png'

import { Container, Form, Input, Logo, SubmitButton } from './styles'

export default function SignIn() {
  const dispatch = useDispatch()

  const [id, setID] = useState('')

  const loading = useSelector(state => state.auth.loading)

  function handleSubmit() {
    dispatch(signInRequest(id))
  }

  return (
    <Container>
      <Image source={logo} />
      <Logo>Gympoint</Logo>
      <Form>
        <Input
          keyboardType="phone-pad"
          onSubmitEditing={handleSubmit}
          value={id}
          onChangeText={setID}
        />
        <SubmitButton onPress={handleSubmit} loading={loading}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  )
}
