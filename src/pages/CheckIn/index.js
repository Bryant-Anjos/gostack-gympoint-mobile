import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import Button from '~/components/Button'

import { Container, CheckIns, Content, Title, Time, Footer } from './styles'

import { listRequest, createRequest } from '~/store/modules/checkins/actions'

function CheckIn({ checkins, loading, page }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (checkins.length === 0) dispatch(listRequest())
  }, [checkins.length, dispatch])

  function renderItem({ item }) {
    return (
      <Content>
        <Title>{item.title}</Title>
        <Time>{item.time}</Time>
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
      <Button onPress={() => dispatch(createRequest())}>Novo check-in</Button>
      <CheckIns
        data={checkins}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReached={() => dispatch(listRequest(page))}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </Container>
  )
}

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-ins',
}

CheckIn.propTypes = {
  checkins: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  checkins: state.checkins.index,
  page: state.checkins.page,
  loading: state.checkins.loading,
})

export default connect(mapStateToProps)(CheckIn)
