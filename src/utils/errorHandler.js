export class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
  
      // Capture l'emplacement exact où l'erreur a été déclenchée
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export const handleError = (err, req, res, next) => {
    let { statusCode, message } = err;
  
    // Définit des valeurs par défaut si elles ne sont pas fournies
    statusCode = statusCode || 500;
    message = message || 'Internal Server Error';
  
    // Si l'erreur provient de Mongoose ou d'autres bibliothèques, ajoutez des cas spécifiques ici
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = Object.values(err.errors).map((val) => val.message).join(', ');
    }
  
    if (err.name === 'CastError') {
      statusCode = 400;
      message = `Resource not found with id: ${err.value}`;
    }
    // Réponse JSON structurée
    res.status(statusCode).json({
      success: false,
      error: message,
    });
  };