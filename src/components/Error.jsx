import styled from '@emotion/styled'


const Errordiv = styled.div `
    color: #FFF;
    font-family: 'Lato', sans-serif;
    font-size: 22px;
    font-weight: 700;
    background-color: #B7322C;
    text-align: center;
    padding: 15px;
    text-transform: uppercase;
`
const Error = ({children}) => {
  return (
    <Errordiv>
        {children}
    </Errordiv>
  )
}

export default Error