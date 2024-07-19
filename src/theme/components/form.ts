const activeLabelStyles = {
  transform: 'scale(0.8) translateY(-22px)',
};

export const formTheme = {
  variants: {
    floating: {
      container: {
        '&:has(.floating-label)': {
          _focusWithin: {
            label: {
              ...activeLabelStyles,
            },
            'input::placeholder, textarea::placeholder, select::placeholder, [id^=react-select-][id$=-placeholder]':
              {
                opacity: 1,
              },
          },
          '&:has(.enable-floating-label) label': {
            ...activeLabelStyles,
          },
          'input::placeholder, textarea::placeholder, select::placeholder, [id^=react-select-][id$=-placeholder]':
            {
              opacity: 0,
            },

          label: {
            top: 0,
            left: 0,
            whiteSpace: 'nowrap',
            zIndex: 2,
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: 'sm',
            pointerEvents: 'none',
            mx: 2,
            px: 1.5,
            my: 2,
            transformOrigin: 'left top',
            _dark: {
              backgroundColor: '#182032',
            },
          },
        },
      },
    },
  },
};
