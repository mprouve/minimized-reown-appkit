import { styled } from '@mui/material';

const Root = styled('div')`
  background-color: #000000;
  display: block;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const ContentContainer = styled('div')`
  display: block;
  width: 100%;
  max-width: 30rem;
  padding: 0 1.5rem;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Heading = styled('p')`
  display: block;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.8rem;
  line-height: 2.2rem;
  font-weight: 700;
  color: #fec300;

  & span {
    color: #fec300;
  }
`;

const Subheading = styled('p')`
  display: block;
  width: 100%;
  margin-top: 1.5rem;
  padding: 0 1.5rem;
  box-sizing: border-box;
  text-align: center;
  /* text-transform: uppercase; */
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
  color: #fff;

  & span {
    color: #fec300;
  }
`;

export default { Root, ContentContainer, Heading, Subheading };
