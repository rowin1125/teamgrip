import React from 'react';

import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    FormLabelProps,
    Input,
    InputGroup,
    InputLeftAddon,
    InputProps,
    InputRightAddon,
} from '@chakra-ui/react';
import { useField } from 'formik';

type ControlledInputProps = {
    label?: string;
    helperText?: string;
    id: string;
    labelProps?: FormLabelProps;
    inputRightAddonText?: string | React.ReactNode;
    inputLeftAddonText?: string | React.ReactNode;
    fullWidth?: boolean;
    formControlProps?: FormControlProps;
    transformValue?: (value: string) => string;
    callback?: (value: string) => void;
} & InputProps;

const ControlledInput = ({
    label,
    helperText,
    id,
    labelProps,
    inputRightAddonText,
    inputLeftAddonText,
    fullWidth = true,
    formControlProps,
    maxW,
    transformValue,
    callback,
    ...props
}: ControlledInputProps) => {
    const [{ onChange, ...field }, meta, { setValue }] = useField(id);
    const isInvalid = !!meta.error && meta.touched;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (transformValue) {
            setValue(transformValue(e.target.value), true);
            return;
        }
        onChange(e);
        callback?.(e.target.value);
    };

    return (
        <FormControl
            isInvalid={isInvalid}
            mb={8}
            maxW={maxW || (fullWidth ? undefined : 80)}
            w="full"
            {...formControlProps}
        >
            {label && (
                <FormLabel fontWeight="bold" htmlFor={id} {...labelProps}>
                    {label}
                </FormLabel>
            )}
            <InputGroup>
                {inputLeftAddonText && (
                    <InputLeftAddon>{inputLeftAddonText}</InputLeftAddon>
                )}
                <Input
                    colorScheme="messenger"
                    id={id}
                    type="text"
                    bg="gray.50"
                    color="black"
                    onChange={handleOnChange}
                    {...field}
                    {...props}
                />
                {inputRightAddonText && (
                    <InputRightAddon>{inputRightAddonText}</InputRightAddon>
                )}
            </InputGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default ControlledInput;
