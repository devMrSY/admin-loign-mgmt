import { Link } from 'react-router-dom'

export default function error() {
  return(
    <div className="error-container">
      <div className="error">Error-404</div>
      <Link className="error-link" to="/">Return to login page</Link>
    </div>
  )
}