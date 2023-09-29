/* eslint-disable @typescript-eslint/no-explicit-any */
export const customSelectStyles = {
    menu: (prevStyles: Record<string, unknown>) => ({
        ...prevStyles,
        backgroundColor: '#F7FAFC',
        color: 'black',
        zIndex: '3',
    }),
    option: (prevStyles: Record<string, unknown>, state: any) => {
        return {
            ...prevStyles,
            backgroundColor: state.isSelected ? '#e5e6e8' : '#F7FAFC',
            color: 'black',
            ':active': {
                backgroundColor: state.isSelected ? '#E2E8F0' : '#F7FAFC',
            },
            ':hover': {
                backgroundColor: '#ddd',
            },
            cursor: 'pointer',
        };
    },
    singleValue: (prevStyles: Record<string, unknown>) => {
        return {
            ...prevStyles,
            color: 'black',
        };
    },
    control: (prevStyles: Record<string, unknown>) => ({
        ...prevStyles,
        backgroundColor: '#F7FAFC',
    }),
    input: (prevStyles: Record<string, unknown>) => ({
        ...prevStyles,
        color: 'black',
    }),
};
