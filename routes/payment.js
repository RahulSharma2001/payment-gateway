const express = require("express");
const paymentController = require("../controllers/paymentController");
const auth = require("../middlewares/auth");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePayment:
 *       type: object
 *       required:
 *         - amount
 *         - currency
 *       properties:
 *         amount:
 *           type: string
 *           description: The amount of the payment
 *         currency:
 *           type: string
 *           description: The currency of the payment
 *       example:
 *         amount: '50'
 *         currency: 'USD'
 */

/**
 * @swagger
 * /api/payment:
 *   post:
 *     summary: Create New Payment
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         format: jwt
 *         required: true
 *         description: JWT token for authentication
 *     tags: [CreatePayment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePayment'
 *     responses:
 *       200:
 *         description: User Loged in successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
router.post("/payment", auth, paymentController.createPayment);

/**
 * @swagger
 * /api/payment/process/{id}:
 *   post:
 *     summary: Process a Payment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Enter Product ID
 *       - in: header
 *         name: token
 *         type: string
 *         format: jwt
 *         required: true
 *         description: JWT token for authentication
 *     responses:
 *       200:
 *         description: Payment proceeded  successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
router.post("/payment/process/:id", auth, paymentController.processPayment);

/**
 * @swagger
 * /api/payment/{id}:
 *   post:
 *     summary: Retrieve a Payment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Enter Product ID
 *       - in: header
 *         name: token
 *         type: string
 *         format: jwt
 *         required: true
 *         description: JWT token for authentication
 *     responses:
 *       200:
 *         description: Payment Retrieve  successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
router.post("/payment/:id", auth, paymentController.retrievePayment);

/**
 * @swagger
 * /api/payment/refund/{id}:
 *   post:
 *     summary: Refund a Payment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Enter Product ID
 *       - in: header
 *         name: token
 *         type: string
 *         format: jwt
 *         required: true
 *         description: JWT token for authentication
 *     responses:
 *       200:
 *         description: Payment Refunded  successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
router.post("/payment/refund/:id", auth, paymentController.refundPayment);

module.exports = router;
