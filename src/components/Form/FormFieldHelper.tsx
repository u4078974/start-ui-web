import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react';

import { Field } from '@chakra-ui/react';

export const FormFieldHelper = forwardRef<
  ComponentRef<typeof Field.HelperText>,
  ComponentPropsWithoutRef<typeof Field.HelperText>
>(({ ...props }, ref) => {
  return <Field.HelperText ref={ref} m={0} {...props} />;
});
FormFieldHelper.displayName = 'FormFieldHelper';
