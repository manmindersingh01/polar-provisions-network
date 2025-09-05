import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-secondary py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">Polar Provisions Network</h3>
            <p className="text-sm text-gray-300">
              Supporting scientific research in extreme polar environments with
              real-time data and critical supply management.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/weather"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Weather Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/supplies"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Supply Tracker
                </Link>
              </li>
              <li>
                <Link
                  to="/research"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Research Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/guides"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Survival Guides
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Emergency</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/emergency"
                  className="text-accent hover:text-accent-300 transition-colors"
                >
                  Emergency Protocols
                </Link>
              </li>
              <li>
                <span className="text-gray-300">Satellite Phone: </span>
                <span className="font-mono">+870-773-110-911</span>
              </li>
              <li>
                <span className="text-gray-300">Radio Frequency: </span>
                <span className="font-mono">121.5 MHz</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Data Usage
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Polar Provisions Network. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}