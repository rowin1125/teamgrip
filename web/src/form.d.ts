/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace StepperForm {
    type FormConfigType = {
        pages: {
            default: Component<any>;
            initialValues: InitialFormValuesType;
            title?: string;
        }[];
    };

    type Component<P = Record<string, unknown>> = {
        (props: P, context?: any): ReactElement<any, any> | null;
        propTypes?: WeakValidationMap<P> | undefined;
        contextTypes?: ValidationMap<any> | undefined;
        defaultProps?: Partial<P> | undefined;
        displayName?: string | undefined;
    };

    type InitialFormValuesType = Record<string, unknown>;

    type FormValuesType = Record<string, unknown>;

    type FormValidationSchemaType = OptionalObjectSchema<ObjectShape>;
}
