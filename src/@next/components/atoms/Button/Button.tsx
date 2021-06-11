import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * The basic button
 */
export const Button: React.FC<IProps> = ({
  color = "primary",
  btnRef,
  children,
  testingContext,
  testingContextId,
  fullWidth = false,
  size = "md",
  ...props
}: IProps) => {
  let ButtonWithTheme;
  switch (color) {
    case "primary":
    case "danger":
      ButtonWithTheme = S.Primary;
      break;
    default:
      ButtonWithTheme = S.Secondary;
  }

  return (
    <ButtonWithTheme
      data-test={testingContext}
      data-test-id={testingContextId}
      color={color}
      fullWidth={fullWidth}
      size={size}
      ref={btnRef}
      {...props}
    >
      <S.Text size={size}>{children}</S.Text>
    </ButtonWithTheme>
  );
};
