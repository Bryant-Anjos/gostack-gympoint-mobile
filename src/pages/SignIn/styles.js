import { Platform } from 'react-native'
import styled from 'styled-components/native'

import Button from '~/components/Button'

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  background-color: #fff;
`

export const Logo = styled.Text`
  text-transform: uppercase;
  font-size: 26px;
  font-weight: bold;
  color: #ee4d64;
  margin-top: 10px;
`

export const Form = styled.View`
  align-self: stretch;
  margin-top: 15px;
`

export const Input = styled.TextInput.attrs({
  placeholder: 'Informe seu ID de cadastro',
})`
  margin-top: 10px;
  height: 46px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 15px;
`

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`
