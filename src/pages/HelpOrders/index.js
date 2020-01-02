import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

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

import { listRequest, refreshRequest } from '~/store/modules/questions/actions'

function HelpOrders({ questions, loading, page, navigation }) {
  const dispatch = useDispatch()
  const { navigate } = navigation

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
        onRefresh={() => dispatch(refreshRequest(page))}
        refreshing={loading}
      />
    </Container>
  )
}

HelpOrders.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  navigation: PropTypes.objectOf([PropTypes.func]).isRequired,
}

const mapStateToProps = state => ({
  questions: state.questions.index,
  page: state.questions.page,
  loading: state.questions.loading,
})

export default connect(mapStateToProps)(HelpOrders)
