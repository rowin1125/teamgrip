import React from 'react';

import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Textarea,
    TextareaProps,
} from '@chakra-ui/react';
import { useField } from 'formik';

type ControlledTextareaProps = {
    label: string;
    helperText?: string;
    id: string;
} & TextareaProps;

const ControlledTextarea = ({
    label,
    helperText,
    id,
    ...props
}: ControlledTextareaProps) => {
    const [field, meta] = useField(id);
    const isInvalid = !!meta.error && !!meta.touched;

    return (
        <FormControl isInvalid={isInvalid} mb={8} maxW={80}>
            <FormLabel fontWeight="bold" htmlFor={id}>
                {label}
            </FormLabel>
            <Textarea bg="gray.50" id={id} type="text" {...field} {...props} />
            {helperText && !isInvalid && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default ControlledTextarea;
