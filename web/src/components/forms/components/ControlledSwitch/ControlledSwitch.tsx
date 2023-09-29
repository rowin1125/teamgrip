import React from 'react';

import {
    Flex,
    FormControl,
    FormControlProps,
    FormHelperText,
    FormLabel,
    FormLabelProps,
    Switch,
    SwitchProps,
    Text,
} from '@chakra-ui/react';
import { useField } from 'formik';

type ControlledSwitchProps = {
    id: string;
    switchProps?: SwitchProps;
    labelProps?: FormLabelProps;
    helperText?: string;
} & FormControlProps;

const ControlledSwitch = ({
    id,
    label,
    switchProps,
    labelProps,
    children,
    helperText,
    ...rest
}: ControlledSwitchProps) => {
    const [field, { error, touched }] = useField(id);

    return (
        <FormControl name={id} {...rest}>
            {label && (
                <FormLabel fontWeight="bold" htmlFor={id} {...labelProps}>
                    {label}
                </FormLabel>
            )}
            <Flex alignItems="center">
                <Switch
                    {...field}
                    id={id}
                    isInvalid={!!error && touched}
                    isChecked={field.value}
                    mt={0}
                    {...switchProps}
                />
                <Text fontSize="md" ml={4}>
                    {children}
                </Text>
            </Flex>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default ControlledSwitch;
