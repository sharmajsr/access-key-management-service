export const ERROR = {
   
    KEY_NOT_FOUND_ERROR: (error) => {
      return [
        {
          code: 'KEY_NOT_FOUND_ERROR',
          message:
            'requested key return an error, please contact support',
          connectorError: error,
        },
      ];
    }
   
  };
  