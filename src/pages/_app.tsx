/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { UserProvider } from "@/contexts/UserContext";

import Layout from '@/components/Layout';
 
export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    );
}
