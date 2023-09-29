import React from 'react';

import { ChakraProps, Checkbox } from '@chakra-ui/react';
import { useField } from 'formik';

type ControlledCheckboxProps = {
    label: string;
    helperText?: string;
    id: string;
} & ChakraProps;

const ControlledCheckbox = ({
    label,
    id,
    ...checkboxProps
}: ControlledCheckboxProps) => {
    const [, meta, { setValue }] = useField(id);
    const isInvalid = !!meta.error;

    return (
        <Checkbox
            defaultChecked={meta.value}
            isInvalid={isInvalid}
            onChange={(e) => setValue(e.target.checked, true)}
            {...checkboxProps}
        >
            {label}
        </Checkbox>
    );
};

export default ControlledCheckbox;
