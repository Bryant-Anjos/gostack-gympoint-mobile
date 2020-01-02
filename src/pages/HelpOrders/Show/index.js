import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Container, Card, Header, Title, Text } from './styles'

export default function Show({ navigation }) {
  const id = navigation.getParam('id')

  const helpOrder = useSelector(state =>
    state.questions.index.find(item => item.id === id)
  )

  return (
    <Container>
      <Card showsVerticalScrollIndicator={false}>
        <Header>
          <Title>Pergunta</Title>
          <Text>{helpOrder.time}</Text>
        </Header>
        <Text>{helpOrder.question}</Text>
        <Title>Resposta</Title>
        <Text>{helpOrder.answer}</Text>
      </Card>
    </Container>
  )
}

Show.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
}
