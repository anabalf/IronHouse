
function PageLayout({ children, backgroundImage }) {
  
  const layoutStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  return (
    <div style={layoutStyle}>
        <div className="container">{ children }</div>
    </div>
  )
}

export default PageLayout;