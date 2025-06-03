import React from 'react';

const Policy = () => {
    return (

        <div className="text-gray-800 font-sans">
            <br />
            <br />
            <br />

            {/* Hero Section */}
            <section className="bg-gradient-to-r mt-3 from-blue-700 to-indigo-800 text-white p-10 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">💼 Welcome to iNext ETS</h1>
                <p className="text-lg md:text-xl">
                    Your Trusted Partner in Investment & Policy Advisory
                </p>
                <p className="mt-4 max-w-3xl mx-auto text-sm md:text-base">
                    Empowering your financial future with smart, secure, and well-informed investment solutions. Whether it’s retirement, your child’s education, or tax-saving strategies — we guide you every step of the way.
                </p>
            </section>

            {/* What We Do */}
            <section className="py-12 px-6 md:px-16 bg-gray-50">
                <h2 className="text-2xl font-bold mb-6 text-center">🌟 What We Do</h2>
                <ul className="grid md:grid-cols-2 gap-4 list-disc list-inside">
                    <li>✅ Mutual Fund Investments</li>
                    <li>✅ SIPs (Systematic Investment Plans)</li>
                    <li>✅ Portfolio Management</li>
                    <li>✅ Retirement Planning</li>
                    <li>✅ Tax-saving Investments (ELSS)</li>
                    <li>✅ Goal-based Financial Planning</li>
                </ul>
            </section>

            {/* Our Expertise */}
            <section className="py-12 px-6 md:px-16">
                <h2 className="text-2xl font-bold mb-6 text-center">💼 Our Expertise</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">✅ Investment Advisory</h3>
                        <ul className="list-disc list-inside">
                            <li>Mutual Funds</li>
                            <li>SIPs & Portfolio Planning</li>
                            <li>Retirement & Pension Planning</li>
                            <li>Wealth Management</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">✅ Policy Advisory</h3>
                        <ul className="list-disc list-inside">
                            <li>Life & Health Insurance</li>
                            <li>Term Plans</li>
                            <li>Child Education & Marriage Plans</li>
                            <li>ULIPs and Endowment Policies</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">✅ Tax & Financial Planning</h3>
                        <ul className="list-disc list-inside">
                            <li>Tax Saving Strategies</li>
                            <li>Emergency Fund Planning</li>
                            <li>Estate & Succession Planning</li>
                            <li>Long-Term Wealth Creation</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Services List */}
            <section className="bg-blue-50 py-12 px-6 md:px-16">
                <h2 className="text-2xl font-bold mb-6 text-center">📋 Our Services</h2>
                <div className="grid md:grid-cols-2 gap-4 list-disc list-inside">
                    <li>🔹 Mutual Fund Investments</li>
                    <li>🔹 SIP (Systematic Investment Plans)</li>
                    <li>🔹 Retirement Planning</li>
                    <li>🔹 Tax-Saving Investments</li>
                    <li>🔹 Life & Health Insurance</li>
                    <li>🔹 Child Education Planning</li>
                    <li>🔹 Term Plans & ULIPs</li>
                    <li>🔹 Corporate & Group Policies</li>
                    <li>🔹 Policy Portfolio Review</li>
                </div>
            </section>

            {/* Mutual Fund Partners */}
            <section className="py-12 px-6 md:px-16 bg-white">
                <h2 className="text-2xl font-bold mb-6 text-center">🏦 Our Mutual Fund Partners</h2>
                <p className="text-center max-w-3xl mx-auto mb-6 text-sm md:text-base">
                    We offer access to top-performing mutual funds from:
                </p>
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 text-sm space-y-2 text-gray-700 text-center">
                    {[
                        "SBI Mutual Fund", "HDFC Mutual Fund", "ICICI Prudential MF", "Axis Mutual Fund", "Kotak Mahindra MF", "Nippon India MF",
                        "Aditya Birla Sun Life MF", "UTI Mutual Fund", "Franklin Templeton MF", "DSP Mutual Fund", "L&T Mutual Fund", "Mirae Asset MF",
                        "Canara Robeco MF", "Tata Mutual Fund", "Edelweiss MF", "Motilal Oswal MF", "Invesco MF", "PGIM India MF", "Baroda BNP MF", "HSBC MF"
                    ].map(name => (
                        <div key={name}>{name}</div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 px-6 md:px-16 bg-gray-100 text-center">
                <h2 className="text-2xl font-bold mb-6">🎯 Why Choose iNext ETS?</h2>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left max-w-4xl mx-auto list-disc list-inside">
                    <li>✔ Certified & Experienced Advisors</li>
                    <li>✔ Personalized Investment Plans</li>
                    <li>✔ Transparent Process & Zero Hidden Charges</li>
                    <li>✔ PAN India Services</li>
                    <li>✔ 100% Client Satisfaction Record</li>
                    <li>✔ Dedicated Support & Guidance</li>
                </ul>
            </section>

            {/* Contact Section */}
            <section className="bg-indigo-800 text-white py-12 px-6 md:px-16 text-center">
                <h2 className="text-2xl font-bold mb-4">📞 Let’s Talk About Your Financial Goals!</h2>
                <p className="text-lg">Call or WhatsApp: <strong>Anubhav Dixit – +91 91119 64605</strong></p>
                <p className="mt-2">🌐 Visit Us Online: <a href="https://www.inextets.in" target="_blank" rel="noopener noreferrer" className="underline">www.inextets.in</a></p>
            </section>
        </div>
    );
};

export default Policy;
