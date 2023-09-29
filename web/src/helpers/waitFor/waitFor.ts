export const waitFor = (ms: number, message?: string) =>
    new Promise((resolve) => {
        console.log(message);
        setTimeout(resolve, ms);
    });
