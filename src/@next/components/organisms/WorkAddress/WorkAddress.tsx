import React, { useState } from "react";

// import { InputSelect } from "@components/molecules";
import { WorkAddressContext } from "./context";
import * as S from "./styles";
// import { Modal } from '../Modal';
import { WorkAddressModal } from "./WorkAddressModal";

export interface IWorkAddressProps {}

export const WorkAddress: React.FC<IWorkAddressProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const [workLocationData, setWorkLocationData] = useState({
    companyName: "IGB",
    companyAddress: "Kempkensberg 12, 9722 TB",
    companyDepartment: "",
    companyCity: "Groningen",
    companyZipCode: "9722 TB",
    companyCountry: { country: "Netherlands" },
  });
  // const [constNewLocation, setNew] = useState();
  const [isNewLocation, setIsNewLocation] = useState(false);

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
            }
          : workLocationData,
        setWorkLocationData,
        setIsNewLocation,
      }}
    >
      <S.Name>Work location details for your vacancy</S.Name>
      <S.Sku>Add the location of where this person will work.</S.Sku>
      <S.WorkLocation>
        <S.Text>{workLocationData.companyName}</S.Text>
        <S.Text>{`${workLocationData.companyAddress}, ${workLocationData.companyZipCode} ${workLocationData.companyCity}, ${workLocationData.companyCountry.country}`}</S.Text>
        <S.Edit onClick={() => setShowModal(true)}>Edit</S.Edit>
      </S.WorkLocation>
      {/* <InputSelect /> */}
      <button
        onClick={() => {
          setShowModal(true);
          setIsNewLocation(true);
        }}
      >
        Create a new a record
      </button>
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
};
WorkAddress.displayName = "WorkAddress";
export default WorkAddress;
