import { PickerOverlay } from "filestack-react";
import React, { useCallback, useContext, useState } from "react";

import { InputSelect, TextField } from "@components/molecules";
import { ShopContext } from "@temp/components/ShopProvider/context";

import * as S from "./styles";

const APIKEY = "A5WLOckASSNScwesJH7mOz";
const POLICY =
  "eyJleHBpcnkiOjE2NDA5MDE2MDAsImNhbGwiOlsicGljayIsInJlYWQiLCJzdGF0Iiwid3JpdGUiLCJ3cml0ZVVybCIsInN0b3JlIiwiY29udmVydCIsInJlbW92ZSIsImV4aWYiXX0=";
const SIGNATURE =
  "8e69569cf5de589955b6b73f46d53c29ba766e92ebf2c516d8e7e5f5220e8b0a";

interface Props {
  handleChange?: any;
  handleSubmit?: any;
  handleBlur?: any;
  values?: any;
  setFieldValue?: any;
  setFieldTouched?: any;
  checkoutWorkAddressFormId?: any;
  checkoutWorkAddressFormRef?: any;
}

export const WorkAddressContent: React.FC<Props> = ({
  handleChange,
  handleSubmit,
  handleBlur,
  values,
  setFieldValue,
  setFieldTouched,

  checkoutWorkAddressFormId,
  checkoutWorkAddressFormRef,
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );
  const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);
  const { countries } = useContext(ShopContext);

  return (
    <form
      id={checkoutWorkAddressFormId}
      ref={checkoutWorkAddressFormRef}
      onSubmit={handleSubmit}
    >
      <S.JobForm>
        <S.Wrapper>
          <S.RowWithOneCell>
            <S.Name>Company name</S.Name>
            <S.Sku>
              For whom will the candidates work for? Your candidates will see
              your company name at the published job posting.
            </S.Sku>
            <TextField
              name="companyName"
              value={values?.companyName}
              {...basicInputProps()}
            />
            <S.Name>Company department (optional)</S.Name>
            <TextField
              name="companyDepartment"
              value={values?.companyDepartment}
              {...basicInputProps()}
            />
            <S.Name>Company logo (for extra job ad boost)</S.Name>
            <S.Sku>Logo extensions: .jpg</S.Sku>
            <S.UploadContainer>
              {values.url === "" ? (
                <S.UploadImgPlaceholder>Upload image</S.UploadImgPlaceholder>
              ) : (
                <S.ImageContainer>
                  <S.Image src={values.url} alt="Company logo" />
                  <S.RemoveButton
                    type="button"
                    onClick={() => {
                      const index = values.url.lastIndexOf("/");
                      const file = values.url.slice(index + 1);
                      fetch(
                        `https://www.filestackapi.com/api/file/${file}?key=${APIKEY}&policy=${POLICY}&signature=${SIGNATURE}`,
                        {
                          method: "DELETE",
                        }
                      );
                      setFieldValue("url", "");
                    }}
                  >
                    <S.RemoveIcon
                      src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='15' height='15' viewBox='0 0 15 15'%3E%3Cdefs%3E%3Cpath id='a' d='M0 0h16v16H0z'/%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd' transform='translate(0 -1)'%3E%3Cmask id='b' fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cpath fill='%23555' d='M.726 3h2.903s1.207-.995 1.452-1.5c.254-.526.484-.5.967-.5h2.904c.28 0 .742.035.967.5.484 1 1.452 1.5 1.452 1.5h2.903c.968 0 .968 1 0 1h-.968s-.967 9-.967 10-.968 2-1.903 2h-5.84c-.967 0-1.935-1-1.935-2S1.694 4 1.694 4H.726c-.968 0-.968-1 0-1zm5.322-1l-.967 1h4.838l-.967-1H6.048zM2.661 4s.968 9.5.968 10 .544 1 .998 1h5.81c.577 0 .868-.552.934-1 .066-.448.968-10 .968-10H2.66zM5 6c0-.5 1-.5 1 0v7c0 .5-1 .5-1 0V6zm2 0c0-.5 1-.5 1 0v7c0 .5-1 .5-1 0V6zm2 0c0-.5 1-.5 1 0v7c0 .5-1 .5-1 0V6z' mask='url(%23b)'/%3E%3C/g%3E%3C/svg%3E"
                      alt="Remove"
                    />
                  </S.RemoveButton>
                </S.ImageContainer>
              )}
              <S.UploadButton
                type="button"
                onClick={() =>
                  isPickerOverlayVisible
                    ? setIsPickerOverlayVisible(false)
                    : setIsPickerOverlayVisible(true)
                }
              >
                Upload
              </S.UploadButton>
              {isPickerOverlayVisible && (
                <PickerOverlay
                  pickerOptions={{
                    onClose: () => setIsPickerOverlayVisible(false),
                  }}
                  apikey={APIKEY}
                  onSuccess={(res: { filesUploaded: { url: any }[] }) => {
                    setFieldValue("url", res.filesUploaded[0].url);
                  }}
                />
              )}
            </S.UploadContainer>
            <S.RowWithTwoCells>
              <div>
                <S.Name>Working location. Country</S.Name>
                <InputSelect
                  options={countries}
                  optionLabelKey="country"
                  optionValueKey="country"
                  name="companyCountry"
                  label=""
                  value={values!.companyCountry}
                  onChange={(value: any, name: any) => {
                    setFieldValue(name, value);
                  }}
                />
              </div>
              <div>
                <S.Name>Working location. Zip code</S.Name>
                <TextField
                  name="companyZipCode"
                  // label="Enter a valid zip code of the work location."
                  value={values?.companyZipCode}
                  {...basicInputProps()}
                />
              </div>
            </S.RowWithTwoCells>
            <S.RowWithTwoCells>
              <div>
                <S.Name>Working location. City</S.Name>
                <TextField
                  name="companyCity"
                  // label="e.g. Amsterdam"
                  value={values?.companyCity}
                  {...basicInputProps()}
                />
              </div>
              <div>
                <S.Name>Working location. Address</S.Name>
                <TextField
                  name="companyAddress"
                  // required
                  value={values?.companyAddress}
                  {...basicInputProps()}
                />
              </div>
            </S.RowWithTwoCells>
          </S.RowWithOneCell>
        </S.Wrapper>
      </S.JobForm>
    </form>
  );
};
