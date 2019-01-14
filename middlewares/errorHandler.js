exports.errorHandler = (errMsg, errCode) => {
   const err = {};
   err.statusCode = errCode;
   err.msg = errMsg;
   return err;
};