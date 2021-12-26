function Newsletter() {
  return (
    <div>
      <h2 className="text-lg font-bold">Join the Newsletter</h2>
      <p className="mt-0 mb-2">
        I send a monthly newsletter with 1 exciting thing, 1 helpful thing, and
        new jobs.
      </p>
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
            <div className="flex justify-between items-end text-xs mb-1">
              Email*
            </div>
            {/* border-radius: 4
px
;
    border: 1
px
 solid rgb(250, 250, 250);
    padding: 5
px
 10
px
;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 3px;
    font-weight: 400;
    margin-top: 5
px
; */}
            <input
              required
              className="revue-form-field rounded border-2 focus:ring-link focus:ring-8 px-4 py-2 font-semibold mt-2 shadow text-black w-100"
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
