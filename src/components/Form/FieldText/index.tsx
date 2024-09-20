import React, { ReactNode, useCallback, useRef, useState } from 'react';

import {
  Flex,
  FlexProps,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import {
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { LuUndo } from 'react-icons/lu';

import { FieldCommonProps } from '@/components/Form/FormFieldController';
import { FormFieldError } from '@/components/Form/FormFieldError';
import { useResettableField } from '@/hooks/useResettableField';

export type InputRootProps = Pick<InputProps, 'placeholder' | 'autoFocus'>;

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
  isResettable?: boolean;
  containerProps?: FlexProps;
  size?: InputGroupProps['size'];
} & InputRootProps &
  FieldCommonProps<TFieldValues, TName>;

export const FieldText = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FieldTextProps<TFieldValues, TName>
) => {
  const { hasChanged, originalValue, resetValue } = useResettableField({
    name: props.name,
  });

  const [leftElementWidth, setLeftElementWidth] = useState(0);
  const leftElementRef = useRef<HTMLDivElement>(null);

  // Calculate the width of the InputLeftElement
  const calculateLeftElementWidth = useCallback(() => {
    if (leftElementRef.current) {
      const { offsetWidth } = leftElementRef.current;
      setLeftElementWidth(offsetWidth);
    }
  }, []);

  // Handle input change and recalculate the width
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: ExplicitAny
  ) => {
    onChange(e);
    setTimeout(calculateLeftElementWidth, 0);
  };

  if (props.isResettable) {
    return (
      <Controller
        {...props}
        render={({ field, fieldState }) => (
          <Flex
            flexDirection="column"
            gap={1}
            flex={1}
            {...props.containerProps}
          >
            <InputGroup size={props.size}>
              {/* Left element with the original (crossed out) value */}
              {!!hasChanged && (
                <InputLeftElement
                  ref={leftElementRef}
                  pointerEvents="none"
                  width="auto"
                  maxW="50%"
                  ml={4}
                >
                  <Text as="del" color="gray.500" noOfLines={1}>
                    {String(originalValue)}
                  </Text>
                </InputLeftElement>
              )}

              {/* Input with the current value */}
              <Input
                isInvalid={!!fieldState.error}
                isDisabled={props.isDisabled}
                type={props.type}
                placeholder={props.placeholder}
                autoFocus={props.autoFocus}
                {...props.inputProps}
                {...field}
                color={hasChanged ? 'warning.600' : props.inputProps?.color}
                pl={
                  hasChanged
                    ? `calc(${leftElementWidth}px + 1.5rem)`
                    : props.inputProps?.pl
                }
                onChange={(e) => handleInputChange(e, field.onChange)}
              />

              {/* Right element with reset button */}
              {!!hasChanged && (
                <InputRightElement>
                  <IconButton
                    aria-label="Reset to original value"
                    icon={<LuUndo />}
                    size="sm"
                    variant="ghost"
                    onClick={resetValue}
                  />
                </InputRightElement>
              )}
            </InputGroup>
            <FormFieldError />
          </Flex>
        )}
      />
    );
  }

  return (
    <Controller
      {...props}
      render={({ field, fieldState }) => (
        <Flex flexDirection="column" gap={1} flex={1} {...props.containerProps}>
          <InputGroup size={props.size}>
            <Input
              isInvalid={!!fieldState.error}
              isDisabled={props.isDisabled}
              type={props.type}
              placeholder={props.placeholder}
              autoFocus={props.autoFocus}
              {...props.inputProps}
              {...field}
            />
            {!!props.startElement && (
              <InputLeftElement>{props.startElement}</InputLeftElement>
            )}
            {!!props.endElement && (
              <InputRightElement>{props.endElement}</InputRightElement>
            )}
          </InputGroup>
          <FormFieldError />
        </Flex>
      )}
    />
  );
};
