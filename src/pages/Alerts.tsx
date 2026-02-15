import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AlertManagement from "@/components/AlertManagement";

/**
 * Alerts Page
 * Manage property alerts and notification preferences
 */
const AlertsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-8">
        <AlertManagement />
      </div>

      <Footer />
    </div>
  );
};

export default AlertsPage;
