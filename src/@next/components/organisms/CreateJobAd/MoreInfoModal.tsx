import React, { useState } from "react";

import { Modal } from "../Modal";
import * as S from "./styles";

export interface IMoreInfoModalProps {
  hideModal: () => void;
}

export const MoreInfoModal: React.FC<IMoreInfoModalProps> = ({ hideModal }) => {
  const [show, setShow] = useState(true);

  return (
    <Modal
      hide={() => {
        hideModal();
        setShow(false);
      }}
      submitBtnText="Got it!"
      submitButtonTestingContext="submitAddressFormModalButton"
      testingContext="submitAddressFormModal"
      title="The updated job description editor"
      disabled={false}
      show={show}
      onSubmit={hideModal}
    >
      <S.ModalDesc>
        You can now choose between editing your text directly in the platform or
        uploading a PDF/Word document. If in the past you have been used to
        uploading your job description as a PDF/Word file, please keep doing so.
        In all other cases, please use the text editor.
      </S.ModalDesc>
      <S.ModalName>How does the text editor work?</S.ModalName>
      <S.ModalDesc>
        You can format your job description exactly as you want it to be. Just
        paste your text in the field and start editing. You can choose from a
        variety of options, e.g. font size, bullet points or numbered lists.
      </S.ModalDesc>
      <S.ModalLink
        href="https://intercom.help/vonq/en/articles/4298732-how-to-fill-in-the-job-description"
        target="_blank"
        rel="noreferrer"
      >
        Read more in our knowledge base article
      </S.ModalLink>
    </Modal>
  );
};
