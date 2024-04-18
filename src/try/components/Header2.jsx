import styled from 'styled-components';
import '../index.css';
import MenuBar from './MenuBar';

const Header = () => {
  return (
    <HeaderDiv>
      <MenuBar />
    </HeaderDiv>
  );
};
export default Header;

const HeaderDiv = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
`;
