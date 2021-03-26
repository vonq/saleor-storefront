import React, { useState } from "react";

import * as S from "./styles";
// import { Modal } from '../Modal';
import { WorkAddressModal } from "./WorkAddressModal";

export interface IWorkAddressProps {}

export const WorkAddress: React.FC<IWorkAddressProps> = () => {
  const [showModal, setShowModal] = useState(false);
  // const [companyName, setCompanyName] = useState('IGB');
  // const [companyAddress, setCompanyAddress] = useState('Kempkensberg 12, 9722 TB');

  return (
    <>
      <S.Name>Work location details for your vacancy</S.Name>
      <S.Sku>Add the location of where this person will work.</S.Sku>
      {/* <AddressTile /> */}
      <button onClick={() => setShowModal(true)}>Show</button>
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
    </>
  );
};
WorkAddress.displayName = "WorkAddress";
export default WorkAddress;
