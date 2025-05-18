

const getErrorDetails = (err: any) => {

    if (!err) return 'Unknown error';
    const messages: string[] = [];

      // Error name
  if (err.name) messages.push(`Name: ${err.name}`);

    //Native errors 
    if (err.message) messages.push(err.message);


    if (err.stack) messages.push(`Stack: ${err.stack}`);
    // Axios-style error
    if (err.response?.data) {
        const data = err.response.data;
        if (typeof data === 'string') {
            messages.push(`Response Data: ${data}`);
        } else if (typeof data === 'object') {
            if (data.message) messages.push(`API Message: ${data.message}`);
            if (data.error) messages.push(`API Error: ${data.error}`);
            if (data.description) messages.push(`API Description: ${data.description}`);
        }
    }

    // Validation errors (e.g. Joi, Zod)
    if (Array.isArray(err.details)) {
        messages.push(
            `Validation Errors: ${err.details.map((d:any) => d.message).join(', ')}`
        );
    }

    if (Array.isArray(err.errors)) {
        messages.push(
            `Validation Errors: ${err.errors.map((d:any) => d.message).join(', ')}`
        );
    }

    return messages.join('\n');


}


export default getErrorDetails;