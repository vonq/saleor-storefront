import { DefaultTheme, media, styled } from "@styles";

export const JobForm = styled.div`
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
  margin-bottom: 5px;
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

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 233px;
  height: 85px;
  margin-right: 30px;
  position: relative;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.875rem;
`;

export const UploadImgPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
  border-radius: 2px;
  background-color: #eee;
  width: 233px;
  height: 85px;
  margin-right: 30px;
  color: #888;
`;

export const UploadButton = styled.button`
  display: inline-block;
  padding: 10px 13px;
  border: 1px solid transparent;
  border-radius: 2px;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: 0.6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;

  -webkit-appearance: button;

  font-size: 12px;
  width: 71px;
  height: 43px;
  background-color: #c3ddf5;
  box-shadow: 0 0 0 rgb(10 135 248 / 0%);
  color: #0a87f8;
  line-height: 20px;
  transition: box-shadow 0.1s ease;

  border: 1px solid transparent;
  background-color: #0a87f8;
  color: #fff;
  line-height: 22px;

  &:hover {
    box-shadow: 0 3px 6px rgb(10 135 248 / 51%);
    text-decoration: none;
    border-color: #0a7acc;
    background-color: #0a7acc;
    color: #fff;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const RemoveIcon = styled.img``;
