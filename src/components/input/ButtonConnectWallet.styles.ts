import { styled } from '@mui/material';

interface RootProps {
  disableGrow: boolean;
  solidBackground: boolean;
  processing: boolean;
  disabled: boolean;
}

const Root = styled('button')<RootProps>`
  background-color: transparent;
  display: inline-block;
  margin-right: 0;
  padding: 0.7rem 0.8rem 0.5rem 0.8rem;
  border: 1px solid #ffffffdd;
  border-radius: 0.1rem;
  outline: none;
  font-family: 'Kevlar Underwear';
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  color: #ffffffee;
  opacity: ${({ processing, disabled }) => (processing || disabled ? 0.5 : 1)};
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out, padding 0.3s ease-in-out,
    color 0.2s ease-in-out;
  pointer-events: ${({ processing, disabled }) => (processing || disabled ? 'none' : 'auto')};
  filter: ${({ processing, disabled }) => (processing || disabled ? 'grayscale(1)' : 'none')};

  &:hover {
    background-color: ${({ solidBackground, theme }) =>
      solidBackground ? `${theme.custom.colors.Yellow}cc` : `${theme.custom.colors.Yellow}55`};
    border: 1px solid ${({ theme }) => theme.custom.colors.Yellow}cc;
    color: #ffffff;
    padding: ${({ disableGrow }) => (disableGrow ? '0.7rem 0.8rem 0.5rem 0.8rem' : '0.9rem 0.8rem 0.7rem 0.8rem')};
  }

  @media (max-width: 1150px) {
    font-size: 0.9rem;
  }
`;

export default {
  Root,
};
