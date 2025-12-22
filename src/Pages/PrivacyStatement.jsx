import React from 'react';
import LegalLayout from '../components/LegalLayout';

const PrivacyStatement = () => {
    return (
        <LegalLayout title="Privacy Policy" lastUpdated="December 22, 2025">
            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors">1. Introduction</h2>
                <p>
                    Rewards Insurance Brokers Limited ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. Information We Collect</h2>
                <p>
                    We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Request an insurance quote</li>
                    <li>Inquire about our services</li>
                    <li>Sign up for our newsletter</li>
                    <li>Contact us via our website forms</li>
                </ul>
                <p className="mt-4">
                    This information may include your name, email address, phone number, and details related to your insurance needs.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. How We Use Your Information</h2>
                <p>
                    We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Provide and maintain our services</li>
                    <li>Process your insurance applications and quotes</li>
                    <li>Communicate with you regarding your inquiries</li>
                    <li>Improve our website and user experience</li>
                    <li>Comply with legal and regulatory requirements</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. Security of Your Information</h2>
                <p>
                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">5. Your Choices</h2>
                <p>
                    You have the right to access, update, or delete the personal information we have on you. If you would like to exercise any of these rights, please contact us at rewardsbrokers@yahoo.com.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">6. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">7. Contact Us</h2>
                <p>
                    If you have questions or comments about this Privacy Policy, please contact us at:
                    <br />
                    Rewards Insurance Brokers Limited
                    <br />
                    Suite 11, Canal House, CBD, Abuja
                    <br />
                    Email: rewardsbrokers@yahoo.com
                </p>
            </section>
        </LegalLayout>
    );
};

export default PrivacyStatement;
