import { FormatXMLElementFn, PrimitiveType } from "intl-messageformat";
import { MessageDescriptor } from "react-intl";

import datePicker from "@/translations/backoffice/datePicker";

export const datePickerStylesConfig = {
  dayOfMonthBtnProps: {
    defaultBtnProps: {
      _hover: {
        background: "primary.500",
        color: "white",
      },
      color: "black",
    },
    selectedBtnProps: {
      backgroundColor: "primary.500",
      color: "white",
    },
    isInRangeBtnProps: {
      color: "red.500",
    },
  },
  dateNavBtnProps: {
    color: "black",
    _hover: {
      background: "primary.500",
      color: "white",
    },
  },
};
type FormatMessageFunc = (
  descriptor: MessageDescriptor,
  values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>,
  opts?: Record<string, unknown>
) => string;

export const datePickerDateConfig = (t: FormatMessageFunc) => {
  return {
    placeholder: t(datePicker.datePickerPlaceholder),
    dateFormat: "dd/MM/yyyy",
    dayNames: [
      t(datePicker.datePickerSunday),
      t(datePicker.datePickerMonday),
      t(datePicker.datePickerTuesday),
      t(datePicker.datePickerWednesday),
      t(datePicker.datePickerThursday),
      t(datePicker.datePickerFriday),
      t(datePicker.datePickerSaturday),
    ],

    monthNames: [
      t(datePicker.datePickerJanuary),
      t(datePicker.datePickerFebruary),
      t(datePicker.datePickerMarch),
      t(datePicker.datePickerApril),
      t(datePicker.datePickerMay),
      t(datePicker.datePickerJune),

      t(datePicker.datePickerJuly),
      t(datePicker.datePickerAugust),
      t(datePicker.datePickerSeptember),
      t(datePicker.datePickerOctober),
      t(datePicker.datePickerNovember),
      t(datePicker.datePickerDecember),
    ],
  };
};
