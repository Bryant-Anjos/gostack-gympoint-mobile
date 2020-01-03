import React, { useEffect, useMemo } from 'react'
import { ActivityIndicator } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import socketio from 'socket.io-client'

import Button from '~/components/Button'

import {
  Container,
  Questions,
  Content,
  Header,
  Title,
  Text,
  Footer,
} from './styles'

import {
  listRequest,
  refreshRequest,
  updateQuestion,
} from '~/store/modules/questions/actions'

function HelpOrders({ questions, loading, page, navigation }) {
  const dispatch = useDispatch()
  const { navigate } = navigation

  const user = useSelector(state => state.user.profile)

  const socket = useMemo(
    () =>
      socketio('http://192.168.0.107:3333', {
        query: {
          student_id: user.id,
        },
      }),
    [user.id]
  )

  useEffect(() => {
    socket.on('question', question => dispatch(updateQuestion(question)))
  }, [dispatch, socket])

  useEffect(() => {
    if (questions.length === 0) dispatch(listRequest())
  }, [questions.length, dispatch])

  function renderItem({ item }) {
    return (
      <Content
        disabled={!item.answered}
        onPress={() => navigate('HelpOrdersShow', { id: item.id })}
      >
        <Header>
          <Title answered={item.answered}>
            {item.answered ? 'Respondido' : 'Sem resposta'}
          </Title>
          <Text>{item.time}</Text>
        </Header>
        <Text numberOfLines={3}>{item.question}</Text>
      </Content>
    )
  }

  function renderFooter() {
    return loading ? (
      <Footer>
        <ActivityIndicator />
      </Footer>
    ) : null
  }

  return (
    <Container>
      <Button onPress={() => navigate('HelpOrdersCreate')}>
        Novo pedido de auxílio
      </Button>
      <Questions
        data={questions}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReached={() => dispatch(listRequest(page))}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        onRefresh={() => dispatch(refreshRequest())}
        refreshing={loading}
      />
    </Container>
  )
}

HelpOrders.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
}

const mapStateToProps = state => ({
  questions: state.questions.index,
  page: state.questions.page,
  loading: state.questions.loading,
})

export default connect(mapStateToProps)(HelpOrders)
