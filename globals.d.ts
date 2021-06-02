declare module 'comma-number' {
    type CommaNumberType = (
        inputNumber: number | string,
        optionalSeparator?: string,
        optionalDecimalChar?: string
    ) => string;

    const commaNumber: CommaNumberType;

    export = commaNumber;
}

interface PrismType {}

interface Window {
    Prism: PrismType;
}

declare namespace NodeJS {
    interface Global {
        Prism: PrismType;
    }
}


declare module 'prism-react-renderer/prism' {
    const Prism: PrismType;
    
    export = Prism;
}

declare module 'lib/breakpoints' {
    const bpMaxSM: string;

    export { bpMaxSM }
}