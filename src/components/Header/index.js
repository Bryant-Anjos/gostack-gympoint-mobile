import React from 'react'
import { Image } from 'react-native'

import logo from '~/assets/logo-small.png'

import { Container, Logo } from './styles'

export default function Header() {
  return (
    <Container>
      <Image source={logo} />
      <Logo>Gympoint</Logo>
    </Container>
  )
}
