// import { useCreateUserAddress, useUpdateUserAddress } from "@saleor/sdk";
// import { CountryCode } from "@saleor/sdk/lib/gqlTypes/globalTypes";
import React, { useRef } from "react";

import { Modal } from "../Modal";
import { WorkAddressForm } from "../WorkAddressForm";

interface Props {
  hideModal?: any;
  submitBtnText?: any;
  target?: any;
  title?: any;
  userId?: any;
  address?: any;
  formId?: any;
}

export const WorkAddressModal: React.FC<Props> = ({
  hideModal,
  submitBtnText,
  target,
  title,
  userId,
  address,
  formId,
  ...props
}) => {
  const [show, setShow] = React.useState(true);
  const checkoutWorkAddressFormId = "work-address-form";
  const checkoutWorkAddressFormRef = useRef<HTMLFormElement>(null);

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
      formId={checkoutWorkAddressFormId}
    >
      <WorkAddressForm
        {...{
          checkoutWorkAddressFormId,
          checkoutWorkAddressFormRef,
          hideModal,
        }}
      />
    </Modal>
  );
};
