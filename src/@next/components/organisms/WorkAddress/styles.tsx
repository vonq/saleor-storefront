import { DefaultTheme, media, styled } from "@styles";

export const JobForm = styled.form`
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const RowWithTwoCells = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    width: calc(50% - ${props => props.theme.spacing.fieldSpacer} / 2);
    ${media.smallScreen`
      width: 100%;
    `}
  }
`;

export const RowWithOneCell = styled.div`
  width: 100%;
`;

export const Name = styled.div`
  grid-area: name;
  font-size: ${props => props.theme.typography.h4FontSize};
`;

export const Sku = styled.div`
  grid-area: sku;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
  margin-bottom: 10px;
`;

export const Title = styled.div`
  padding: 25px 0px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  font-size: ${props => props.theme.typography.h3FontSize};
  text-transform: uppercase;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  ${media.mediumScreen`
    font-size: ${(props: { theme: DefaultTheme }) =>
      props.theme.typography.h4FontSize};
    cursor: pointer;
  `}
`;

export const WorkLocation = styled.div`
  width: calc(50% - 8px);
  padding: 16px;
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
`;

export const Text = styled.p`
  font-size: ${props => props.theme.typography.baseFontSize};
`;

export const Edit = styled.button`
  height: 43px;
  width: 50px;
  background-color: #c3ddf5;
  box-shadow: 0 0 0 rgb(10 135 248 / 0%);
  color: #0a87f8;
  line-height: 20px;
  transition: box-shadow 0.1s ease;

  &:hover {
    box-shadow: 0 3px 6px rgb(10 135 248 / 51%);
    text-decoration: none;
  }
`;
