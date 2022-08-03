/* eslint-disable @typescript-eslint/no-explicit-any */
export const customSelectStyles = {
  menu: (prevStyles: Record<string, unknown>) => ({
    ...prevStyles,
    backgroundColor: '#242e42',
    zIndex: '3',
  }),
  option: (prevStyles: Record<string, unknown>, state: any) => {
    return {
      ...prevStyles,
      ':active': {
        backgroundColor: state.isSelected ? '$242e42' : '#454d5e',
      },
      ':hover': {
        backgroundColor: '#0d121d',
      },
      cursor: 'pointer',
    }
  },
  singleValue: (prevStyles: Record<string, unknown>) => {
    return {
      ...prevStyles,
      color: 'white',
    }
  },
  control: (prevStyles: Record<string, unknown>) => ({
    ...prevStyles,
    backgroundColor: '#242e42',
  }),
}
