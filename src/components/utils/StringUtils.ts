const StringUtils = {
  isBlank: (value: any): boolean => {
    return value === undefined || value === null || value === "";
  },
};

export default StringUtils;
