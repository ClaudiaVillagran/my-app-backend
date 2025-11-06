const WebpayPlus = require("transbank-sdk").WebpayPlus; // CommonJS

const {
  Options,
  IntegrationApiKeys,
  Environment,
  IntegrationCommerceCodes,
} = require("transbank-sdk"); // CommonJS

const uuid = require("uuid");

const startPayment = async (req, res) => {
  //monto enviado desde el frontend
  let amount = req.body.amount;

  //url para
  const returnUrl = "https://localhost:3000/confirmation-payment";

  //crear un id por cada pago
  let sessionId = uuid.v4();

  //crear una fecha para el pago
  let buyOrder = "buyOrder" + Date.now();

  const commerceCode = process.env.secretKey;

  const apiKey = process.env.apiKey;

  WebpayPlus.environment = Environment.Integration;

  WebpayPlus.configureForProduction(commerceCode, apiKey);

  try {
    const response = await new WebpayPlus.Transaction().create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    console.log(response);
    //url, token = asjhdas832741jkdashi8 -> pago rechazado , error de pago

    res.status(200).json({ url: response.url, token: response.token });
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};

const confirmPayment = async (req, res) => {
  const { token_ws } = req.body;

  const commerceCode = process.env.secretKey;

  const apiKey = process.env.apiKey;

  WebpayPlus.configureForProduction(commerceCode, apiKey);

  try {
    //commit para guardar nuestro dinero en gtransbank y despues retirarlo
    const response = await new WebpayPlus.Transaction().commit(token_ws);

    if (response.response_code === 0 && response.status === "AUTHORIZED") {
      const transactionInfo = {
        vci: response.vci,
        amount: response.amount,
        status: response.status,
        buyOrder: response.buyOrder,
        sessionId: response.sessionId,
        cardDetail: response.cardDetail,
        accountingDate: response.accountingDate,
        transactionDate: response.transactionDate,
        authorizationCode: response.authorizationCode,
        paymentTypeCode: response.paymentTypeCode,
        responseCode: response.responseCode,
        installmentsAmount: response.installmentsAmount,
        installmentsNumber: response.installmentsNumber,
        balance: response.balance,
      };
      res.status(200).json({
        status: "success",
        transactionInfo,
      });
    }else {
      res.status(200).json({
        status: "failed",
        responseCode: response.responseCode,
        statusDescription: response.status,
      });
    }
  } catch (error) {
     res.status(500).send("Error interno del servidor");
  }
};


module.exports = { startPayment, confirmPayment };