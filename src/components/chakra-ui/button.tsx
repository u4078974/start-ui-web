import { forwardRef } from 'react';

import type {
  ButtonProps as ChakraButtonProps,
  RecipeVariantProps,
} from '@chakra-ui/react';
import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
  defineRecipe,
  useRecipe,
} from '@chakra-ui/react';

interface ButtonLoadingProps {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

export interface ButtonProps
  extends ChakraButtonProps,
    ButtonLoadingProps,
    RecipeVariantProps<typeof buttonRecipe> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, size, visual, ...rest } =
      props;

    const recipe = useRecipe({ recipe: buttonRecipe });
    const styles = recipe({ visual, size });

    return (
      <ChakraButton disabled={loading || disabled} ref={ref} {...rest}>
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    );
  }
);

const buttonRecipe = defineRecipe({
  variants: {
    visual: {
      '@primary': { bg: 'brand.200' },
    },
  },
});
