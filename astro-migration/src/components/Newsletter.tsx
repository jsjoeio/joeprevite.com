const description =
  'I send a monthly newsletter with 1 exciting thing, 1 helpful thing, fun internet findings and new jobs. Subscribe for exclusive goodies!'
function Newsletter() {
  return (
    <div>
      <h2>Join the Newsletter</h2>
      <p className="mt-0 mb-2">{description}</p>
      <div id="revue-embed">
        <form
          action="https://www.getrevue.co/profile/jsjoeio/add_subscriber"
          method="post"
          id="revue-form"
          name="revue-form"
          className="revue-form-group"
          target="_blank"
        >
          <label htmlFor="member_email">
            <div className="flex justify-between items-end">Email*</div>
            <input
              required
              className="revue-form-field"
              placeholder="awesomeperson@gmail.com"
              type="email"
              name="member[email]"
              id="member_email"
            />
          </label>

          <input
            className="revue-form-actions w-auto"
            type="submit"
            value="Sign me up!"
            name="member[subscribe]"
            id="member_submit"
          />
        </form>
        <small className="revue-form-footer block mt-2">
          By subscribing, you agree with Revue’s{' '}
          <a
            className="hover:text-blue-800 underline"
            target="_blank"
            href="https://www.getrevue.co/terms"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            className="hover:text-blue-800 underline"
            target="_blank"
            href="https://www.getrevue.co/privacy"
          >
            Privacy Policy
          </a>
          .
        </small>
      </div>
    </div>
  )
}

export default Newsletter
