const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }
});



const sendOrderEmail = async (order, user) => {
    const itemsHtml = order.items.map(item =>
        `<li>${item.name ? '(' + item.size + ')' : ''} x${item.qty} - $${item.price}</li>`
    ).join('');

    const html = `
        <h2>Thank you for your order, ${user.name}!</h2>
        <p>Order ID: <strong>${order._id}</strong></p>
        <p>Order Date: <strong>${new Date(order.orderDate).toLocaleString()}</strong></p>
        <h3>Order Items:</h3>
        <ul>${itemsHtml}</ul>
        <h3>Total : $${order.totalPrice}</h3>
        <p>We'll let you know once your order ships. Thanks for shopping with us!</p>
    `;

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: user.email,
        subject: `Order Confirmation - #${order._id}`,
        html
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendOrderEmail