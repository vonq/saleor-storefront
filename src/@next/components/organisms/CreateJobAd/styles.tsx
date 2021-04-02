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
`;

export const Sku = styled.div`
  grid-area: sku;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
  margin-bottom: 10px;
`;

export const Label = styled.label`
  margin: 0px 20px 0px 0px;
  display: inline-block;
`;
// export const Label = styled.label`
//   width: 180px;
//   display: flex;
//   justify-content: space-between;
// `;

export const LabelRight = styled.label`
  display: inline-block;
  margin: 0px 0px 0px 4px;
`;

export const Radio = styled.input``;

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

export const SubTitle = styled.div`
  font-size: ${props => props.theme.typography.h4FontSize};
  margin-bottom: 15px;
`;

export const TextArea = styled.div`
  position: relative;
  margin: 15px 0;
  z-index: 0;
`;

export const Desc = styled.div`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin-bottom: 15px;
`;

export const Experience = styled.div`
  max-width: 150px;
  margin-top: 10px;
`;

// display: grid;
// grid-template-columns: 30px auto;
// grid-row-gap: 6px;
export const CheckboxArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 20px;
`;

export const CheckboxSpan = styled.span`
  margin-left: 8px;
`;

export const Hours = styled.div`
  margin: 15px 0;
`;

export const Number = styled.input`
  padding: 6px 12px;
  width: 70px;
  border: 1px solid #ddd;
  border-radius: 2px;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: inset 0 1px 1px 0 rgb(51 51 51 / 10%);
  color: #333;
  font-size: ${props => props.theme.typography.baseFontSize};
  margin-left: 8px;
`;

export const Salary = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
`;

export const SalarySpan = styled.span`
  margin-bottom: 1.875rem;
`;

export const SalaryInput = styled.input`
  padding: 6px 12px;
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 2px;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: inset 0 1px 1px 0 rgb(51 51 51 / 10%);
  color: #333;
  font-size: ${props => props.theme.typography.baseFontSize};
  margin-bottom: 1.875rem;
`;

export const SalaryCurrency = styled.div`
  width: 69px;
`;

export const SalaryPeriod = styled.div`
  width: 100px;
`;

// export const Contacts = styled.div`

// `;

export const InputSelectWrapper = styled.div`
  margin-top: 10px;
`;
