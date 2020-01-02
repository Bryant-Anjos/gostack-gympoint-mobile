import React, { useState } from 'react'
import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import Button from '~/components/Button'

import { Container, TextArea } from './styles'

import { createRequest } from '~/store/modules/questions/actions'

export default function Create({ navigation }) {
  const dispatch = useDispatch()
  const [question, setQuestion] = useState('')

  function handleSubmit() {
    if (question.trim() === '') {
      Alert.alert(
        'A pergunta não pode ser vazia',
        'Por favor, escreva uma pergunta para fazer um novo pedido de auxilio'
      )
    } else {
      dispatch(createRequest(question.trim()))
      navigation.navigate('HelpOrders')
    }
  }

  return (
    <Container>
      <TextArea
        multiline
        style={{
          textAlignVertical: 'top',
        }}
        value={question}
        onChangeText={setQuestion}
      />
      <Button onPress={handleSubmit}>Enviar pedido</Button>
    </Container>
  )
}

Create.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
}
