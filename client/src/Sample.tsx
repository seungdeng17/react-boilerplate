import styled from 'styled-components';
import sample from '@asset/sample.png';

export default function Sample() {
  return (
    <Wrapper>
      <Img src={sample} />
      <Title>React Boilerplate</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #2f3640;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Img = styled.img`
  margin-bottom: 50px;
  animation-name: imgAnim;
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  @keyframes imgAnim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 50px;
`;
