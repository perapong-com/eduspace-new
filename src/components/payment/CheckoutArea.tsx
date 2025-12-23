"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Sample cart items
const CART_ITEMS = [
    {
        id: 1,
        title: 'เภสัชวิทยาคลินิกเบื้องต้น',
        titleEn: 'Clinical Pharmacology Basics',
        instructor: 'ภก.สมชาย ใจดี',
        credits: 2.5,
        originalPrice: 1900,
        price: 1500,
        image: 'assets/img/courses/01.jpg',
    },
    {
        id: 2,
        title: 'การบริบาลผู้ป่วยเบาหวาน',
        titleEn: 'Diabetes Patient Care',
        instructor: 'ภก.วิชัย สุขใจ',
        credits: 3.0,
        originalPrice: null,
        price: 1800,
        image: 'assets/img/courses/02.jpg',
    },
    {
        id: 3,
        title: 'กฎหมายเภสัชกรรม',
        titleEn: 'Pharmacy Law',
        instructor: 'ภก.ประสิทธิ์ นิติกร',
        credits: 2.0,
        originalPrice: 1500,
        price: 1200,
        image: 'assets/img/courses/03.jpg',
    },
];

const CheckoutArea = () => {
    const { language, t } = useLanguage();
    const [cartItems, setCartItems] = useState(CART_ITEMS);
    const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'card'>('promptpay');
    const [voucherCode, setVoucherCode] = useState('');

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearAll = () => {
        setCartItems([]);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal;

    return (
        <section className="checkout-section section-padding">
            <div className="container">
                <div className="row g-4">
                    {/* Left: Cart Items */}
                    <div className="col-lg-7">
                        <div className="cart-wrapper" style={{
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '24px',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
                        }}>
                            {/* Header */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 style={{ color: '#333', margin: 0 }}>
                                    {t('คอร์สเรียน', 'Courses')} ({cartItems.length})
                                </h5>
                                <button
                                    onClick={clearAll}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <i className="fas fa-trash"></i>
                                    {t('ลบทั้งหมด', 'Remove All')}
                                </button>
                            </div>

                            {/* Cart Items */}
                            {cartItems.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="fas fa-shopping-cart" style={{ fontSize: '48px', color: '#ddd', marginBottom: '16px' }}></i>
                                    <p style={{ color: '#666' }}>{t('ไม่มีคอร์สในตะกร้า', 'No courses in cart')}</p>
                                    <Link href="/courses-grid" className="theme-btn" style={{ padding: '10px 24px' }}>
                                        {t('เลือกคอร์สเรียน', 'Browse Courses')}
                                    </Link>
                                </div>
                            ) : (
                                <div className="cart-items">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="cart-item d-flex gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
                                            {/* Course Image */}
                                            <div style={{
                                                width: '120px',
                                                height: '80px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                flexShrink: 0
                                            }}>
                                                <img
                                                    src={item.image}
                                                    alt={language === 'th' ? item.title : item.titleEn}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>

                                            {/* Course Info */}
                                            <div className="flex-grow-1">
                                                <h6 style={{ color: '#014D40', marginBottom: '4px', fontSize: '15px' }}>
                                                    {language === 'th' ? item.title : item.titleEn}
                                                </h6>
                                                <p style={{ color: '#666', fontSize: '13px', marginBottom: '8px' }}>
                                                    {t('ผู้สอน', 'Instructor')}: {item.instructor}
                                                </p>
                                                <span style={{
                                                    background: '#E8F8F4',
                                                    color: '#014D40',
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '12px'
                                                }}>
                                                    {item.credits} {t('หน่วยกิต CPE', 'CPE Credits')}
                                                </span>
                                            </div>

                                            {/* Price & Remove */}
                                            <div className="text-end" style={{ minWidth: '100px' }}>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: '#999',
                                                        cursor: 'pointer',
                                                        padding: '4px',
                                                        marginBottom: '8px'
                                                    }}
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                                <div>
                                                    {item.originalPrice && (
                                                        <p style={{
                                                            color: '#999',
                                                            fontSize: '13px',
                                                            textDecoration: 'line-through',
                                                            marginBottom: '2px'
                                                        }}>
                                                            ฿{item.originalPrice.toLocaleString()}
                                                        </p>
                                                    )}
                                                    <p style={{
                                                        color: '#014D40',
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        margin: 0
                                                    }}>
                                                        ฿{item.price.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Payment Options */}
                    <div className="col-lg-5">
                        <div className="payment-wrapper" style={{
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '24px',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
                        }}>
                            <h5 style={{ color: '#014D40', marginBottom: '20px' }}>{t('เลือกช่องทางชำระเงิน', 'Select Payment Method')}</h5>

                            {/* Payment Methods */}
                            <div className="payment-methods mb-4">
                                {/* QR PromptPay */}
                                <label
                                    className="payment-option d-flex align-items-center justify-content-between p-3 mb-2"
                                    style={{
                                        border: paymentMethod === 'promptpay' ? '2px solid #014D40' : '1px solid #e0e0e0',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        background: paymentMethod === 'promptpay' ? '#f8fffe' : '#fff'
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: '#014D40',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <i className="fas fa-qrcode" style={{ color: '#fff' }}></i>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: '500', color: '#333' }}>QR PromptPay</p>
                                            <small style={{ color: '#666' }}>{t('ไม่มีค่าธรรมเนียม • ยืนยันทันที', 'No fees • Instant confirmation')}</small>
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        border: paymentMethod === 'promptpay' ? '6px solid #014D40' : '2px solid #ccc',
                                        background: '#fff'
                                    }}></div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'promptpay'}
                                        onChange={() => setPaymentMethod('promptpay')}
                                        style={{ display: 'none' }}
                                    />
                                </label>

                                {/* Credit/Debit Card */}
                                <label
                                    className="payment-option d-flex align-items-center justify-content-between p-3"
                                    style={{
                                        border: paymentMethod === 'card' ? '2px solid #014D40' : '1px solid #e0e0e0',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        background: paymentMethod === 'card' ? '#f8fffe' : '#fff'
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: '#f0f0f0',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <i className="fas fa-credit-card" style={{ color: '#666' }}></i>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: '500', color: '#333' }}>{t('บัตรเครดิต/เดบิต', 'Credit/Debit Card')}</p>
                                            <div className="d-flex gap-1 mt-1">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" style={{ height: '16px' }} />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" style={{ height: '16px' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        border: paymentMethod === 'card' ? '6px solid #014D40' : '2px solid #ccc',
                                        background: '#fff'
                                    }}></div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>

                            {/* Voucher Code */}
                            <div className="voucher-section mb-4">
                                <label style={{ color: '#666', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                                    {t('โค้ดส่วนลด / VOUCHER', 'Discount Code / VOUCHER')}
                                </label>
                                <div className="d-flex gap-2">
                                    <input
                                        type="text"
                                        placeholder={t('ใส่รหัสส่วนลด', 'Enter discount code')}
                                        value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value)}
                                        style={{
                                            flex: 1,
                                            padding: '12px 16px',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            color: '#333'
                                        }}
                                    />
                                    <button style={{
                                        background: '#014D40',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px 16px',
                                        cursor: 'pointer'
                                    }}>
                                        <i className="fas fa-check"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="order-summary mb-4">
                                <h6 style={{ color: '#014D40', marginBottom: '16px' }}>{t('สรุปยอดชำระ', 'Order Summary')}</h6>

                                <div className="d-flex justify-content-between mb-2">
                                    <span style={{ color: '#666' }}>{t('ราคารวม', 'Subtotal')} ({cartItems.length} {t('รายการ', 'items')})</span>
                                    <span>฿{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span style={{ color: '#666' }}>{t('ภาษี', 'Tax')} (7%)</span>
                                    <small style={{ color: '#999' }}>{t('รวมในราคาขายแล้ว', 'Included in price')}</small>
                                </div>

                                <div className="d-flex justify-content-between pt-3" style={{ borderTop: '1px solid #e0e0e0' }}>
                                    <strong style={{ color: '#014D40' }}>{t('ยอดสุทธิ', 'Total')}</strong>
                                    <div className="text-end">
                                        <strong style={{ color: '#014D40', fontSize: '24px' }}>
                                            ฿{total.toLocaleString()}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={() => window.location.href = paymentMethod === 'promptpay' ? '/payment-qr' : '/payment-card'}
                                disabled={cartItems.length === 0}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: cartItems.length === 0 ? '#ccc' : '#014D40',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
                                    marginBottom: '16px'
                                }}
                            >
                                {t('ดำเนินการชำระเงิน', 'Proceed to Payment')}
                            </button>

                            {/* Terms */}
                            <p className="text-center" style={{ fontSize: '12px', color: '#999', margin: 0 }}>
                                {t('โดยการดำเนินการต่อ คุณยอมรับ', 'By proceeding, you accept our')}{' '}
                                <Link href="#" style={{ color: '#014D40' }}>{t('เงื่อนไขการให้บริการ', 'Terms of Service')}</Link>
                                {' '}{t('และ', 'and')}{' '}
                                <Link href="#" style={{ color: '#014D40' }}>{t('นโยบายความเป็นส่วนตัว', 'Privacy Policy')}</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutArea;
