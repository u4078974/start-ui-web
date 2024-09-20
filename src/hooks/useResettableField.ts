import { useEffect, useRef, useState } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

type UseResettableFieldProps = {
  name: string;
};

export const useResettableField = ({ name }: UseResettableFieldProps) => {
  const { control, getValues, setValue, formState } = useFormContext();

  // State to store the original value
  const [originalValue, setOriginalValue] = useState(getValues(name));

  // Watch the current value of the field
  const currentValue = useWatch({ control, name });

  // Store the previous submit count to detect changes
  const previousSubmitCountRef = useRef(formState.submitCount);

  useEffect(() => {
    // Check if the form was successfully submitted and submit count increased
    if (
      formState.isSubmitSuccessful &&
      formState.submitCount > previousSubmitCountRef.current
    ) {
      // Update originalValue to the new value after successful submission
      setOriginalValue(getValues(name));
      previousSubmitCountRef.current = formState.submitCount; // Update the submit count ref
    }
  }, [formState.isSubmitSuccessful, formState.submitCount, getValues, name]);

  // Determine if the value has changed
  const hasChanged = currentValue !== originalValue;

  // Function to reset the value to the original
  const resetValue = () => {
    setValue(name, originalValue);
  };

  return {
    originalValue,
    currentValue,
    hasChanged,
    resetValue,
  };
};
