module.exports = ({ genericErrorMessage = 'An error has occurred' } = {}) =>
  (error, req, res) => {
    console.error(error);
    if (error.status) {
      return res.status(error.status).json({
        type: error.name,
        status: error.status,
        message: error.message
      });
    }
    return res.status(500).json({ message: genericErrorMessage });
  };
