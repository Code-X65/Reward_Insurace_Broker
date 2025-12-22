import React from 'react';
import LegalLayout from '../components/LegalLayout';

const TermsOfService = () => {
    return (
        <LegalLayout title="Terms of Service" lastUpdated="December 22, 2025">
            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. Agreement to Terms</h2>
                <p>
                    By accessing or using the website of Rewards Insurance Brokers Limited, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. Use License</h2>
                <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on Rewards Insurance Brokers' website for personal, non-commercial transitory viewing only.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. Disclaimer</h2>
                <p>
                    The materials on Rewards Insurance Brokers' website are provided on an 'as is' basis. Rewards Insurance Brokers makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. Limitations</h2>
                <p>
                    In no event shall Rewards Insurance Brokers or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">5. Accuracy of Materials</h2>
                <p>
                    The materials appearing on Rewards Insurance Brokers' website could include technical, typographical, or photographic errors. Rewards Insurance Brokers does not warrant that any of the materials on its website are accurate, complete or current. We may make changes to the materials contained on its website at any time without notice.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">6. Links</h2>
                <p>
                    Rewards Insurance Brokers has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Rewards Insurance Brokers of the site. Use of any such linked website is at the user's own risk.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">7. Governing Law</h2>
                <p>
                    These terms and conditions are governed by and construed in accordance with the laws of Nigeria and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">8. Contact Information</h2>
                <p>
                    If you have any questions about these Terms, please contact us at rewardsbrokers@yahoo.com.
                </p>
            </section>
        </LegalLayout>
    );
};

export default TermsOfService;
