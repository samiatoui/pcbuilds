import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export const AddToCart = () => {
    const form = useRef();
    const location = useLocation();
    const { productId, productName, productPrice } = location.state || {}; // Fallback in case state is undefined

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_g01tso8', 'template_5aosd3d', form.current, 'KUIWVT6oYOsVZlloO')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className="cart-container">
            <div className="cart-form">
                <form ref={form} onSubmit={sendEmail}>
                    <input type="hidden" name="product_id" value={productId} />
                    <label>First Name</label>
                    <input type="text" name="user_name" />

                    <label>Last Name</label>
                    <input type="text" name="user_lname" />

                    <label>Country</label>
                    <b>Canada</b>

                    <label>Street Address</label>
                    <input type="text" name="user_address" placeholder='House number and Street name' />
                    <input type="text" name="user_apt" placeholder='Apartment, suite, unit, etc. (optional)' />

                    <label>Province</label>
                    <select name="user_province">
                        <option value="">Select a Province</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                        <option value="YT">Yukon</option>
                    </select>

                    <label>Phone</label>
                    <input type="phone" name="phone" />

                    <label>Email</label>
                    <input type="email" name="user_email" />


                    <input type="submit" value="Send" />
                </form>
            </div>

            <div className="checkout-product">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{productName}</td>
                            <td>${productPrice ? productPrice : '0.00'}</td>
                        </tr>
                        <tr>
                            <td>Subtotal</td>
                            <td>${productPrice ? productPrice : '0.00'}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>${productPrice ? productPrice : '0.00'}</td>
                        </tr>

                    </tbody>
                    <td>                    
                        <p>Your personal data will be used to process your order.</p>
                    </td>
                </table>
            </div>
        </div>
    );
};
