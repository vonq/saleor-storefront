import { Formik } from "formik";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { InputSelect } from "@components/molecules";

import { WorkAddressContext } from "./context";
import * as S from "./styles";
import { CheckoutStep } from "./utils";
// import { Modal } from '../Modal';
import { WorkAddressModal } from "./WorkAddressModal";

export interface IWorkAddressProps {
  changeSubmitProgress: any;
  onSubmitSuccess: any;
}

export const WorkAddress: React.FC<IWorkAddressProps> = forwardRef(
  ({ changeSubmitProgress, onSubmitSuccess }, ref) => {
    const checkoutWorkAddressFormId = "work-address";
    const checkoutWorkAddressFormRef = useRef<HTMLFormElement>(null);

    const [showModal, setShowModal] = useState(false);
    const [workLocationData, setWorkLocationData] = useState({
      companyName: "IGB",
      companyAddress: "Kempkensberg 12, 9722 TB",
      companyDepartment: "",
      companyCity: "Groningen",
      companyZipCode: "9722 TB",
      companyCountry: { country: "Netherlands" },
      url: "https://cdn.filestackcontent.com/lPKX9kuRSMqVqLlsNPH2",
      id: "1",
    });
    // const [constNewLocation, setNew] = useState();
    const [isNewLocation, setIsNewLocation] = useState(false);
    const [companies, setCompanies] = useState([
      {
        companyName: "IGB",
        companyAddress: "Kempkensberg 12, 9722 TB",
        companyDepartment: "",
        companyCity: "Groningen",
        companyZipCode: "9722 TB",
        companyCountry: { country: "Netherlands" },
        url: "https://cdn.filestackcontent.com/lPKX9kuRSMqVqLlsNPH2",
        id: "1",
      },
      {
        companyName: "VONQ",
        companyAddress: "Beursplein",
        companyDepartment: "",
        companyCity: "Rotterdam",
        companyZipCode: "3011 AA",
        companyCountry: { country: "Netherlands" },
        url: "https://cdn.filestackcontent.com/FP3ycQ8oQYuP2HS2IdEj",
        id: "2",
      },
    ]);

    useImperativeHandle(ref, () => () => {
      checkoutWorkAddressFormRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    });

    return (
      <WorkAddressContext.Provider
        value={{
          workLocationData: isNewLocation
            ? {
                companyName: "",
                companyAddress: "",
                companyDepartment: "",
                companyCity: "",
                companyZipCode: "",
                companyCountry: { country: "" },
                url: "",
                id: new Date().toString(),
              }
            : workLocationData,
          setWorkLocationData,
          setIsNewLocation,
          isNewLocation,
          companies,
          setCompanies,
        }}
      >
        <S.Name>Work location details for your vacancy</S.Name>
        <S.Sku>Add the location of where this person will work.</S.Sku>
        <S.WorkLocation>
          <S.WorkCard>
            <S.Preview>
              <S.ImageContainer>
                <S.Image src={workLocationData.url} alt="Company logo" />
              </S.ImageContainer>
              <S.Edit onClick={() => setShowModal(true)}>Edit</S.Edit>
            </S.Preview>
            <S.Text>{workLocationData.companyName}</S.Text>
            <S.Text>{`${workLocationData.companyAddress}, ${workLocationData.companyZipCode} ${workLocationData.companyCity}, ${workLocationData.companyCountry.country}`}</S.Text>
          </S.WorkCard>
          <Formik
            initialValues={{}}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              onSubmitSuccess(CheckoutStep.Payment);
            }}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              setFieldValue,
              setFieldTouched,
            }) => (
              <S.SelectContainer
                id={checkoutWorkAddressFormId}
                ref={checkoutWorkAddressFormRef}
                onSubmit={handleSubmit}
              >
                <InputSelect
                  options={companies}
                  optionLabelKey="companyName"
                  optionValueKey="companyName"
                  // value={workLocationData.companyName}
                  label=""
                  value={workLocationData}
                  onChange={event => {
                    setWorkLocationData(event);
                    setFieldValue("company", event);
                  }}
                />
                <S.CreateNew
                  type="button"
                  onClick={() => {
                    setShowModal(true);
                    setIsNewLocation(true);
                  }}
                >
                  Create a new a record
                </S.CreateNew>
              </S.SelectContainer>
            )}
          </Formik>
        </S.WorkLocation>
        {showModal && (
          <WorkAddressModal
            hideModal={() => {
              setShowModal(false);
            }}
            submitBtnText="Add"
            title="Modal"
            target=""
          />
        )}
      </WorkAddressContext.Provider>
    );
  }
);
WorkAddress.displayName = "WorkAddress";
export default WorkAddress;
