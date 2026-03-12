import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="foot-top">
          <div>
            <div className="foot-name">Patent Gap AI</div>
            <div className="foot-loc">San Francisco · Stockholm</div>
          </div>
          <div className="foot-links">
            <a href="mailto:contact@patentgap.ai">contact@patentgap.ai</a>
            <a href="https://www.linkedin.com/company/patent-gap-ai" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <Link to="/contact">Contact Us</Link>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div className="foot-copy">
          © 2026 Patent Gap AI. All rights reserved. Patent Gap AI does not provide legal advice.
          Platform outputs are intended to assist qualified patent professionals.
        </div>
      </div>
    </footer>
  )
}
