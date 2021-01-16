interface HttpException extends Error {
  error?: Error;
  status: number;
  data: string;
}

export default HttpException;
