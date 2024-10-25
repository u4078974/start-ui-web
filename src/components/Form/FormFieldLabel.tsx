import { ComponentRef, forwardRef } from 'react';

import { Field, Span } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useFormField } from '@/components/Form/FormField';

export type FormFieldLabelProps = Field.LabelProps & {
  optionalityHint?: 'required' | 'optional' | false;
};

export const FormFieldLabel = forwardRef<
  ComponentRef<typeof Field.Label>,
  FormFieldLabelProps
>(({ optionalityHint, children, ...props }, ref) => {
  const { size } = useFormField();
  const { t } = useTranslation(['components']);

  return (
    <Field.Label
      fontSize={size}
      ref={ref}
      w="full"
      alignItems="baseline"
      gap={1}
      {...props}
    >
      {children}
      {optionalityHint === 'required' && (
        <Span color="red.600" _dark={{ color: 'red.400' }}>
          *
        </Span>
      )}
      {optionalityHint === 'optional' && (
        <Span fontSize="0.8em" color="gray.600" _dark={{ color: 'gray.400' }}>
          ({t('components:formField.optional')})
        </Span>
      )}
    </Field.Label>
  );
});
FormFieldLabel.displayName = 'FormFieldLabel';
