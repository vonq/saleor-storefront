import { useAccountUpdate, useAuth } from "@saleor/sdk";
import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Attribute, IconButton, Tile } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import { AccountUpdateForm } from "./AccountUpdateForm";
import * as S from "./styles";

export const AccountTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setAccountUpdate, { data, error }] = useAccountUpdate();
  const intl = useIntl();
  const { user } = useUser();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    }
  }, [data, error]);
  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper>
          <S.Header>
            <FormattedMessage defaultMessage="MY DATA" />
          </S.Header>
          <S.Content>
            <S.HeaderSmall>
              <FormattedMessage defaultMessage="Personal details" />
              {!isEditing && (
                <IconButton
                  testingContext="editDetailsButton"
                  name="edit"
                  size={22}
                  onClick={() => setIsEditing(isEditing => !isEditing)}
                />
              )}
            </S.HeaderSmall>
            {isEditing ? (
              <AccountUpdateForm
                initialValues={{
                  firstName: (user && user.given_name as string) || "",
                  lastName: (user && user.family_name as string) || "",
                }}
                handleSubmit={data => {
                  setAccountUpdate({ input: data });
                }}
                hide={() => {
                  setIsEditing(false);
                }}
              />
            ) : (
              <S.ContentOneLine data-test="personalDetailsSection">
                <Attribute
                  description={intl.formatMessage(commonMessages.firstName)}
                  attributeValue={(user && user.given_name as string) || "-"}
                  testingContext="firstNameText"
                />
                <Attribute
                  description={intl.formatMessage(commonMessages.lastName)}
                  attributeValue={(user && user.family_name as string) || "-"}
                  testingContext="lastNameText"
                />
              </S.ContentOneLine>
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
