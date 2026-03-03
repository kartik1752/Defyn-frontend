function Features() {
  return (
    <div className="features">
      <h2 className="features-title">Features Solution</h2>
      
      <div className="plans-header">
        <span className="plan-tag free-tag">Free</span>
        <span className="plan-tag subscription-tag">Subscription</span>
      </div>

      <div className="features-grid">
        {/* Free Features Column */}
        <div className="feature-card free">
          <h3>Here are some features that will help</h3>
          <ul className="feature-list">
            <li>✓ Auto Spam protection</li>
            <li>✓ Auto Raid detector and protection</li>
            <li>✓ Filter system for nsfw content and messages</li>
            <li>✓ welcome & many more</li>
          </ul>
        </div>

        {/* Premium Features Column */}
        <div className="feature-card premium glow">
          <h3>Here are some premium one</h3>
          <ul className="feature-list">
            <li>✨ Customize ur bot as per u</li>
            <li>✨ enable roles</li>
            <li>✨ leveling system</li>
            <li>✨ and many more</li>
          </ul>
          <div className="premium-badge">PREMIUM</div>
        </div>
      </div>
    </div>
  )
}

export default Features