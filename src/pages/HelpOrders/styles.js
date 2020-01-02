import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: #f2f2f2;
  padding: 15px 30px 0;
  height: 100%;
`

export const Questions = styled.FlatList`
  margin: 10px 0;
`

export const Content = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 4px;
  margin-top: 10px;
  padding: 15px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`

export const Title = styled.Text`
  color: ${props => (props.answered ? '#42CB59' : '#999')};
  margin-left: 10px;
  font-weight: bold;
`

export const Text = styled.Text`
  color: #666;
`

export const Footer = styled.View`
  margin-top: 10px;
`
