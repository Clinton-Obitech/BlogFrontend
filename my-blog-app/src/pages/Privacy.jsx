import styles from "./Page.module.css";

export default function Privacy() {
    return (
        <div className={styles.tacp}>
  <h2>Privacy Policies</h2>
  <p>At <strong>[Your Blog Name]</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.</p>

  <h3>Information We Collect</h3>
  <p>We may collect personal information such as your name or email address when you subscribe, comment, or contact us.</p>

  <h3>How We Use Your Information</h3>
  <p>Your information is used to improve our content, respond to inquiries, and send updates if you subscribe.</p>

  <h3>Cookies</h3>
  <p>We may use cookies to enhance user experience and analyze site traffic. You can disable cookies in your browser settings.</p>

  <h3>Third-Party Services</h3>
  <p>We may use third-party tools such as analytics or ads. These services may collect data according to their own privacy policies.</p>

  <h3>Data Protection</h3>
  <p>We take reasonable measures to protect your personal information but cannot guarantee absolute security.</p>

  <h3>Your Consent</h3>
  <p>By using this website, you consent to this Privacy Policy.</p>

  <h3>Contact</h3>
  <p>If you have any questions about this Privacy Policy, contact us at 
    <a href="mailto:[your email]">[your email]</a>.
  </p>
        </div>
    )
}