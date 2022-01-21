import React from 'react';
import '../CSS/access.css'
export default function Access() {
    return <div>
        <div>
            <div className="starsec"></div>
            <div className="starthird"></div>
            <div className="starfourth"></div>
            <div className="starfifth"></div>
        </div>
        <section className="texts">
            <div className="texts__content">
                <div className="texts__message">
                    <h1 className="message__title">User Not Logged in</h1>
                    <p className="message__text">We're sorry, the page you were looking for is Authenticated </p>
                    <p className="message__text">Login to view the content of the page</p>
                    <button>
                        <a href='/login'>Login</a>
                        <span className="first"></span>
                        <span className="second"></span>
                        <span className="third"></span>
                        <span className="fourth"></span>
                    </button>
                </div>
            </div>

        </section>
    </div>;
}
