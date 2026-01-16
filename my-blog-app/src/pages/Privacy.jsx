import styles from "./Page.module.css";

export default function Privacy() {
    return (
        <div className={styles.tacp}>
  <h3>Privacy Policies</h3>
  <p>At <strong>[Your Blog Name]</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.</p>

  <h4>Information We Collect</h4>
  <p>We may collect personal information such as your name or email address when you subscribe, comment, or contact us.</p>

  <h4>How We Use Your Information</h4>
  <p>Your information is used to improve our content, respond to inquiries, and send updates if you subscribe.</p>

  <h4>Cookies</h4>
  <p>We may use cookies to enhance user experience and analyze site traffic. You can disable cookies in your browser settings.</p>

  <h4>Third-Party Services</h4>
  <p>We may use third-party tools such as analytics or ads. These services may collect data according to their own privacy policies.</p>

  <h4>Data Protection</h4>
  <p>We take reasonable measures to protect your personal information but cannot guarantee absolute security.</p>

  <h4>Your Consent</h4>
  <p>By using this website, you consent to this Privacy Policy.</p>

  <h4>Contact</h4>
  <p>If you have any questions about this Privacy Policy, contact us at 
    <a href="mailto:[your email]">[your email]</a>.
  </p>
        </div>
    )
}