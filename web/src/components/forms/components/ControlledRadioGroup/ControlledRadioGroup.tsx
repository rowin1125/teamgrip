import React, { ReactNode } from 'react';

import {
    ChakraProps,
    Flex,
    FormControl,
    FormLabel,
    RadioGroup,
    RadioGroupProps,
    Stack,
    StackProps,
} from '@chakra-ui/react';
import { useField } from 'formik';

type ControlledRadioGroupProps = {
    id: string;
    label?: string;
    radioGroupProps?: RadioGroupProps;
    stackProps?: StackProps;
    children: ReactNode;
} & ChakraProps;

const ControlledRadioGroup = ({
    id,
    label,
    radioGroupProps,
    stackProps,
    children,
    ...rest
}: ControlledRadioGroupProps) => {
    const [meta, , { setValue }] = useField(id);

    const handleChange = (value: string) => {
        setValue(value);
    };

    return (
        <FormControl id={id} label={label} {...rest} mb={8}>
            <Flex alignItems="center">
                {label && (
                    <FormLabel fontWeight="bold" htmlFor={id}>
                        {label}
                    </FormLabel>
                )}
                <RadioGroup
                    {...meta}
                    onChange={handleChange}
                    {...radioGroupProps}
                >
                    <Stack direction="row" {...stackProps}>
                        {children}
                    </Stack>
                </RadioGroup>
            </Flex>
        </FormControl>
    );
};

export default ControlledRadioGroup;
