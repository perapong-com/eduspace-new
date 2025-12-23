
"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import NavMenu from './NavMenu';
import NiceSelect from '@/ui/NiceSelect';
import UseSticky from '@/hooks/UseSticky';
import OffCanvas from '@/common/OffCanvas';
import HeaderUserProfile from '@/components/common/HeaderUserProfile';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

const HeaderTwo = () => {
    const selectHandler = (e: any) => { };
    const { sticky } = UseSticky()
    const [openCanvas, setOpenCanvas] = useState(false)

    return (
        <>
            <header className="header-section-2">
                <div className="container">
                    <div className="header-top">
                        <Link href="/" className="top-logo">
                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#004736' }}>Pharmacy Academy</span>
                        </Link>
                    </div>
                </div>
                <div id="header-sticky" className={`header-2 ${sticky ? "sticky" : ""}`}>
                    <div className="container">
                        <div className="mega-menu-wrapper">
                            <div className="header-main">
                                <Link href="/" className="header-logo">
                                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#004736' }}>Pharmacy Academy</span>
                                </Link>
                                <div className="header-left">
                                    <div className="mean__menu-wrapper">
                                        <div className="main-menu">
                                            <nav id="mobile-menu">
                                                <NavMenu />
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="header-right d-flex justify-content-end align-items-center" style={{ gap: '12px' }}>
                                    <LanguageSwitcher />
                                    <HeaderUserProfile />
                                    <div className="header__hamburger d-xl-none my-auto">
                                        <div className="sidebar__toggle" onClick={() => setOpenCanvas(!openCanvas)}>
                                            <i className="fas fa-bars"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <OffCanvas openCanvas={openCanvas} setOpenCanvas={setOpenCanvas} />

        </>
    );
};

export default HeaderTwo;