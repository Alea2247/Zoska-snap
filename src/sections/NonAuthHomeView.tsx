export default function NonauthHomeView() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>Prihlas sa deges</p>
        <button onClick={() => alert('Redirect to registration page')}>
          Register Now!
        </button>
      </div>
    );
  }
  