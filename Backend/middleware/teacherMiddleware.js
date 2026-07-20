const teacherMiddleware = (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({
      message: "Only teachers can perform this action",
    });
  }

  next();
};

export default teacherMiddleware;