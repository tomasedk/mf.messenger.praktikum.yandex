interface Window {
    Handlebars: {
        compile: <T>(input: string) => (context: T) => string;
    };
}
