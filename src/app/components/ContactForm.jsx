export default function ContactForm() {
  return (
    <>
      <div className="form-container pt-[3rem]">
        <form>
          <div className="name-input border-black border-4">
            <input type="text" id="name" name="name" />
          </div>
          <div className="email-input border-black border-4">
            <input type="text" id="email" name="email" />
          </div>
          <div className="feedback-input border-black border-4">
            <input type="text" id="feedback" name="feedback" />
          </div>

          <button type="submit">Submit </button>
        </form>
      </div>
    </>
  );
}
