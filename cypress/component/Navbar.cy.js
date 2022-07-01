/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import Navbar from '../../components/navbar'

describe('<Navbar />', () => {
  it('mounts', () => {
    cy.mount(<Navbar />)
  })
})
