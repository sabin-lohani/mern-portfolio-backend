export default asyncHandler = (asyncFn) => (req, res, next) =>
  Promise.resolve(asyncFn(req, res, next)).catch(next);
