import { styled } from "@styles";

export const Title = styled.h1`
  cursor: pointer;
  margin-bottom: 16px;
  font: 700 24px/32px Raleway, sans-serif;
`;

export const Desc = styled.div`
  margin-bottom: 16px;
  color: #000;
  font: normal 14px/22px Roboto, sans-serif;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const SubTitleStatus = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #0a87f8;
  color: #fff;
  text-align: center;
  font-weight: 500;
  line-height: 24px;
  margin-right: 10px;
`;

export const SubTitleText = styled.h2`
  margin-bottom: 0;
  font: 700 18px/24px Raleway, sans-serif;
`;

export const CheckoutStep = styled.div`
  background: #fff;
  box-shadow: 0 1px 3px 0 rgb(51 51 51 / 20%);
  padding: 22px 24px;
  border-radius: 3px;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;
