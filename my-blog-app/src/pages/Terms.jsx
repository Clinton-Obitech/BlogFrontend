import styles from "./Page.module.css";

export default function Terms() {
 return (
  <div className={styles.tacp}>
  <h2>Terms and Condition</h2>
  <p>Welcome to <strong>[Your Blog Name]</strong>. By accessing or using this website, you agree to comply with and be bound by these Terms and Conditions.</p>

  <h3>Use of Content</h3>
  <p>All content published on this blog is for informational purposes only. You may not copy, reproduce, or redistribute any content without prior written permission.</p>

  <h3>User Conduct</h3>
  <p>You agree not to use this website for any unlawful purpose or to post harmful, abusive, or misleading content.</p>

  <h3>Comments & Contributions</h3>
  <p>We reserve the right to remove comments or content that we consider inappropriate, offensive, or spam.</p>

  <h3>External Links</h3>
  <p>This blog may contain links to third-party websites. We are not responsible for the content or practices of those websites.</p>

  <h3>Limitation of Liability</h3>
  <p>[Your Blog Name] will not be liable for any loss or damage arising from the use of this website.</p>

  <h3>Changes to Terms</h3>
  <p>We may update these Terms and Conditions at any time. Continued use of the site means you accept the updated terms.</p>

  <h3>Contact</h3>
  <p>If you have any questions about these Terms, please contact us at <a href="mailto:[your email]">[your email]</a>.</p>
        </div>
    )
}