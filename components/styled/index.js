import styled from "@emotion/styled";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.5px solid #dbdbdb;
  border-radius: 8px;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px 1px #00000040;
  }
`;

export const Banner = styled.div`
  height: 180px;
  position: relative;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin: auto;
  max-width: 1500px;
`;

export const Container = styled.div`
  padding: 1rem;
`;

export const Heading = styled.h1`
  text-align: center;
  margin: 1rem auto;
`;

export const Text = styled.p`
  margin-bottom: ${({ mb }) => mb};
`;