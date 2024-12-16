import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) string += "1234567890";
    if (charAllowed) string += "!@#$%^&*(){}?[]{}`~+_";

    for (let i = 0; i < length; i++) {
      pass += string[Math.floor(Math.random() * string.length)];
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, charAllowed, generatePassword]);

  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full h-[200px] flex flex-col justify-center items-center gap-5 mt-8">
        <h1 className="text-4xl font-bold">Password Generator</h1>

        {/* Input Div */}
        <div className="w-[50%] h-[60px] relative">
          <input
            type="text"
            className="w-full h-full border-2 border-zinc-500 px-4"
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button
            className="bg-sky-400 px-4 py-[17.5px] text-white absolute top-[1px] right-[1px]"
            onClick={copyPassword}
          >
            COPY
          </button>
        </div>

        {/* Slider Parent Div */}
        <div className="h-[40px] w-[50%] border-2 border-sky-500 flex gap-8 justify-center items-center">
          <div className="h-full flex w-[240px] items-center justify-center  gap-[10px]">
            <input
              type="range"
              value={length}
              name=""
              id=""
              onChange={(e) => setLength(e.target.value)}
            />{" "}
            Length = {length}
          </div>

          <div className="h-full w-[140px] flex items-center justify-center gap-2">
            <input
              type="checkbox"
              name=""
              id="num"
              value={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
              defaultChecked={numAllowed}
            />
            <label htmlFor="num">Numbers</label>
          </div>

          <div className="h-full w-[240px] flex items-center justify-center gap-2">
            <input
              type="checkbox"
              name=""
              id="num"
              value={charAllowed}
              onClick={() => setCharAllowed((prev) => !prev)}
              defaultChecked={charAllowed}
            />
            <label htmlFor="num">Special Characters</label>
          </div>
        </div>

        <h1 className="font-semibold underline">Use the slider to change the length of the password</h1>
      </div>
    </>
  );
}

export default App;
