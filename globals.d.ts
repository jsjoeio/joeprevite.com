declare module 'comma-number' {
    type CommaNumberType = (
        inputNumber: number | string,
        optionalSeparator?: string,
        optionalDecimalChar?: string
    ) => string;

    const commaNumber: CommaNumberType;

    export = commaNumber;
}