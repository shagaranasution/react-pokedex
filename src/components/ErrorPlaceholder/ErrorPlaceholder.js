import './error-placeholder.css'

const ErrorPlaceholder = () => {
  return (
    <div className="ErrorPlaceholder">
      <p className="ErrorPlaceholder__head">
        Opps!
      </p>
      <p className="ErrorPlaceholder__body">
        There is no data to show. Please reload the page.
      </p>
    </div>
  )
}

export default ErrorPlaceholder