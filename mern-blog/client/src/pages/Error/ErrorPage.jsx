import React from 'react'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <section className='error-page'>
      <div className="center">
        <h1 className="errPg">Oops! Page Not Found</h1>
        <div className="top1">
          <Link to="/" className='btn primary'>Go Back Home</Link>
        </div>
        <h2 className="errPg">Page Not Found</h2>
      </div>

    </section>
  )
}

export default ErrorPage
