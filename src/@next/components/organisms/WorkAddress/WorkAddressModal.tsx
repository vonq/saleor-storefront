import { useCreateUserAddress, useUpdateUserAddress } from "@saleor/sdk";
import { CountryCode } from "@saleor/sdk/lib/gqlTypes/globalTypes";
import React from "react";
import { WorkAddressForm } from '../WorkAddressForm';

import { Modal } from "../Modal";

export const WorkAddressModal: React.FC<IProps> = ({
  hideModal,
  submitBtnText,
  target,
  title,
  userId,
  address,
  formId,
  ...props
}: IProps) => {
  const [show, setShow] = React.useState(true);

  return (
    <Modal
      submitButtonTestingContext="submitAddressFormModalButton"
      testingContext="submitAddressFormModal"
      title={title}
      hide={() => {
        hideModal();
        setShow(false);
      }}
      disabled={false}
      show={show}
      submitBtnText={submitBtnText}
      onSubmit={() => hideModal()}
    >
      <WorkAddressForm />
    </Modal>
  );
};
