/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse, TErrorSources } from "../interface/error";

const handleDuplicateError = (err: any): TErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  console.log("err", err);

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exist!`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate Error",
    errorSources,
  };
};

export default handleDuplicateError;
