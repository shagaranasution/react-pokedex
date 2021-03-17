import './error-placeholder.css'

const ErrorPlaceholder = () => {
  return (
    <div className="ErrorPlaceholder">
      <p className="ErrorPlaceholder__head">
        Opps!
      </p>
      <p className="ErrorPlaceholder__body">
      Sorry, something is wrong. Could not fetch the data.
      </p>
    </div>
  )
}

export default ErrorPlaceholder