const GENERIC_ERROR_MESSAGE = 'An error has occurred';

module.exports = () =>
  (error, req, res) => {
    console.error(error);
    if (error.status) {
      return res.status(error.status).json({
        type: error.name,
        status: error.status,
        message: error.message
      });
    }
    return res.status(500).json({ message: GENERIC_ERROR_MESSAGE });
  };
