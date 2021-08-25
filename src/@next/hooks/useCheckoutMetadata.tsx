import { useEffect, useState } from "react";

import { useLocalStorage } from "./useLocalStorage";

export const useCheckoutMetadata = () => {
  const {
    storedValue: checkoutData,
    setValue: setCheckoutData,
  } = useLocalStorage("data_checkout");

  const [metadata, setStoredMetadata] = useState<any>(checkoutData?.metadata);

  useEffect(() => {
    setCheckoutData({
      ...checkoutData,
      metadata,
    });
  }, [metadata]);

  const setMetadata = (value: any) => {
    setStoredMetadata(value);
  };

  const appendMetadata = (appendData: any) => {
    setMetadata({
      ...metadata,
      ...appendData,
    });
  };

  const setMetadataField = (field: any, value: any) => {
    if (!field || !value) {
      return;
    }
    appendMetadata({
      [field]: value,
    });
  };

  return {
    metadata,
    setMetadata,
    appendMetadata,
    setMetadataField,
  };
};
