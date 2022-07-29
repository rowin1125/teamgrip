import React from "react";

import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  IconButton,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useField } from "formik";
import { CgClose } from "react-icons/cg";

import {
  datePickerDateConfig,
  datePickerStylesConfig,
} from "./datePickerStylesConfig";

import useTranslation from "@/hooks/useTranslation";

type ControlledDatePickerProps = {
  label: string;
  helperText?: string;
  id: string;
  inline?: boolean;
  labelProps?: FormLabelProps;
};

const ControlledDatePicker = ({
  id,
  label,
  helperText,
  labelProps,
  inline = false,
}: ControlledDatePickerProps) => {
  const { t } = useTranslation();
  const [field, meta, { setValue }] = useField(id);
  const isInvalid = !!meta.error && !!meta.touched;

  return (
    <FormControl isInvalid={isInvalid} maxW={80}>
      <Box display={inline ? "inline" : "flex"} alignItems="center">
        <FormLabel htmlFor={id} {...labelProps}>
          {label}
        </FormLabel>

        <Box position="relative">
          <SingleDatepicker
            name={id}
            date={field.value}
            onDateChange={setValue}
            propsConfigs={datePickerStylesConfig}
            configs={datePickerDateConfig(t)}
            id={id}
          />
          <IconButton
            position="absolute"
            right="0px"
            icon={<CgClose color="gray" />}
            variant="ghost"
            aria-label="Clear date"
            onClick={() => setValue("", false)}
            zIndex={1}
          />
        </Box>
      </Box>
      {helperText && !isInvalid && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default ControlledDatePicker;
