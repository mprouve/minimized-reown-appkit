import { styled } from '@mui/material';

interface RootProps {
  fullWidth: boolean;
}

const Root = styled('div')<RootProps>`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 0.2rem;
  text-align: center;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Barlow';
  font-size: 1rem;
  font-weight: 400;
  line-height: 1rem;
  color: #fff;
  transition: border-color 0.4s ease-in-out, 0.4s ease-in-out;
  cursor: pointer;
  position: relative;
`;

export default { Root };
