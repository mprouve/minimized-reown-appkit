import { styled } from '@mui/material';

interface RootProps {
  disableGrow: boolean;
  solidBackground: boolean;
  processing: boolean;
  disabled: boolean;
}

const Root = styled('button')<RootProps>`
  background-color: #00000000;
  display: inline-block;
  margin-right: 0;
  padding: 0.7rem 0.8rem 0.5rem 2.4rem;
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
  position: relative;

  & > svg {
    display: block;
    font-size: 1.2rem;
    /* margin-bottom: 1px; */
    position: absolute;
    left: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
  }

  & > span {
    display: inline-block;
    vertical-align: middle;
  }

  & > svg > path {
    transition: fill 0.2s ease-in-out;
    fill: #ffffffdd;
  }

  &:hover {
    background-color: ${({ solidBackground }) => (solidBackground ? '#0052ff' : '#0052ff55')};
    border: 1px solid #0052ff;
    color: #fff;
    padding: ${({ disableGrow }) => (disableGrow ? '0.7rem 0.8rem 0.5rem 2.4rem' : '0.9rem 0.8rem 0.7rem 2.4rem')};

    & > svg > path {
      fill: #fff;
    }
  }

  @media (max-width: 1150px) {
    font-size: 0.9rem;

    & > svg {
      font-size: 1.1rem;
    }
  }
`;

export default {
  Root,
};
