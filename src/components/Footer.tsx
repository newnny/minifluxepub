const Footer = () => {
  const getYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        This website uses Google Analytics and Hotjar for analyzing website traffic, user behavior, and improving user experience.
      </p>
      {`Copyright © Minifluxbinder ${getYear}`}
    </footer>
  )
}

export default Footer

