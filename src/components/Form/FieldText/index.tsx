import { ReactNode } from 'react';

import { Flex, FlexProps, Input, InputProps } from '@chakra-ui/react';
import {
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import { FieldCommonProps } from '@/components/Form/FormFieldController';
import { FormFieldError } from '@/components/Form/FormFieldError';
import {
  InputGroup,
  InputGroupProps,
} from '@/components/chakra-ui/input-group';

export type InputRootProps = Pick<InputProps, 'placeholder' | 'autoFocus'> &
  Pick<InputGroupProps, 'startElement' | 'endElement'>;

export type FieldTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type: 'text' | 'email' | 'tel';
  startElement?: ReactNode;
  endElement?: ReactNode;
  inputProps?: RemoveFromType<
    RemoveFromType<InputProps, InputRootProps>,
    ControllerRenderProps
  >;
  containerProps?: FlexProps;
  size?: InputProps['size'];
} & InputRootProps &
  FieldCommonProps<TFieldValues, TName>;

export const FieldText = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FieldTextProps<TFieldValues, TName>
) => {
  return (
    <Controller
      {...props}
      render={({ field, fieldState }) => (
        <Flex
          flexDirection="column"
          gap={1}
          w="full"
          flex={1}
          {...props.containerProps}
        >
          <InputGroup
            startElement={props.startElement}
            endElement={props.endElement}
          >
            <Input
              size={props.size}
              aria-invalid={fieldState.error ? true : undefined}
              data-invalid={fieldState.error ? true : undefined}
              disabled={props.isDisabled}
              type={props.type}
              placeholder={props.placeholder}
              autoFocus={props.autoFocus}
              {...props.inputProps}
              {...field}
            />
          </InputGroup>
          <FormFieldError />
        </Flex>
      )}
    />
  );
};
