import { useState, useCallback, } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numallowed, setNumallowed] = useState(true);
  const [charallowed, setCharallowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numallowed, charallowed]);

  // copy code (logic)
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Password Generator</h1>

      <div style={styles.section}>
        {/* slider */}
        <label style={styles.label}>
          Length: {length}
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            style={styles.slider}
          />
        </label>
      </div>

      <div style={styles.section}>
        {/* checkboxes */}
        <label style={styles.checkboxContainer}>
          <input
            type="checkbox"
            defaultChecked={numallowed}
            onChange={() => setNumallowed(prev => !prev)}
          />
          <span style={styles.checkboxLabel}>Include Numbers</span>
        </label>
      </div>

      <div style={styles.section}>
        
        <label style={styles.checkboxContainer}>
          <input
            type="checkbox"
            defaultChecked={charallowed}
            onChange={() => setCharallowed(prev => !prev)}
          />
          <span style={styles.checkboxLabel}>Include Special Characters</span>
        </label>
      </div>

      <div style={styles.section}>
        <button onClick={passwordGenerator} style={styles.button}>
          Generate Password
        </button>
      </div>

      <div style={styles.section}>
        <input type="text" value={password} readOnly placeholder="Password" style={styles.input} />
      </div>

      <div style={styles.section}>
        <button onClick={handleCopy} style={styles.button}>
          Copy
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: 500,
    height:500,
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#333",
    color: "#ffa500",
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
  },
  title: {
    fontSize: "2rem",
    color: "#fff",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    color: "#fff",
    marginBottom: "10px",
  },
  slider: {
    width: "100%",
  },
  checkboxContainer: {
    display: "inline-flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  checkboxLabel: {
    marginLeft: "8px",
    color: "#fff",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
};

export default App;
