import React from 'react';
import style from './uwealth.module.css';

import UWealthVideo from '../../assets/images/UWealth/Videos/UWealth video.mp4';
import AnalystRec from '../../assets/images/UWealth/images/Analyst Recs.png';
import StockStats from '../../assets/images/UWealth/images/Stock Stats.png';
import StockSummary from '../../assets/images/UWealth/images/Stock Summary.png';

const UWealth = () => {
    return (
        <div className={style.layoutWrapper}>
            <div className={style.mainContent}>

                {/* Hero Section */}
                <div className={style.section}>
                    <div className={style.infoBox}>
                        <h1>UWealth</h1>
                        <p>A comprehensive stock tracking application designed to empower users with real-time market insights and personalized portfolio management. Built by UW Tech Startup Club members.</p>
                    </div>
                    <div className={style.videoBox}>
                        <video autoPlay muted loop playsInline>
                            <source src={UWealthVideo} type="video/mp4" />
                        </video>
                    </div>
                </div>

                {/* Feature Sections */}
                <div className={style.section}>
                    <div className={style.textContent}>
                        <h2>Clear Summaries</h2>
                        <p>Get concise, actionable summaries of stock performance and market positions.</p>
                    </div>
                    <img src={StockSummary} alt="Stock Summary" />
                </div>

                <div className={style.section}>
                    <div className={style.textContent}>
                        <h2>Advanced Statistics</h2>
                        <p>Track key indicators, monitor market trends, and analyze historical data with precision.</p>
                    </div>
                    <img src={StockStats} alt="Stock Statistics" />
                </div>

                <div className={style.section}>
                    <div className={style.textContent}>
                        <h2>Expert Analysis</h2>
                        <p>Access comprehensive analyst recommendations and market sentiment analysis to make informed investment decisions.</p>
                    </div>
                    <img src={AnalystRec} alt="Analyst Recommendations" />
                </div>
            </div>
        </div>
    );
};

export default UWealth;