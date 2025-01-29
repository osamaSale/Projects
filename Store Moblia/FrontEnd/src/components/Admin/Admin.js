import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { NavbarVertical } from './NavbarVertical';
import { Dashboard } from './Dashboard';
import { Users } from './Tables/Users';
import { Brands } from './Tables/Brands';
import { Devices } from './Tables/Devices';
import { Products } from './Tables/Products';
import { Contact } from './Tables/Contact';
import { News } from './Tables/News';
import { Wishlist } from './Tables/Wishlist';
import { Carts } from './Tables/Carts';
import { Orders } from './Tables/Orders';
import { Comments } from './Tables/Comments';

export const Admin = ({ update }) => {
    const [toggleState, settoggleState] = useState(1)
    return (
        <div>
            <Navbar />
            <div className="main-wrapper">
                <NavbarVertical toggleState={toggleState} settoggleState={settoggleState} />
                <main className="main-content-wrapper">
                    {toggleState === 1 ? <Dashboard /> :
                        toggleState === 2 ? <Users update={update} /> :
                            toggleState === 3 ? <Brands update={update} /> :
                                toggleState === 4 ? <Devices update={update} /> :
                                    toggleState === 5 ? <Products update={update} /> :
                                        toggleState === 6 ? <Contact update={update} /> :
                                            toggleState === 7 ? <News update={update} /> :
                                                toggleState === 8 ? <Wishlist update={update} /> :
                                                    toggleState === 9 ? <Carts update={update} /> :
                                                        toggleState === 10 ? <Orders update={update} /> :
                                                            toggleState === 11 ? <Comments update={update} /> :
                                                                ""}
                </main>
            </div>
        </div>
    );
}

