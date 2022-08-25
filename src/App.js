import "./App.css";
import Dice from "./images/icon-dice.svg";
import { useEffect, useState } from "react";

function App() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { id, advice } = content;
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) {
        setLoading(false);
        throw new Error("fetch data failed");
      }
      const { slip } = await res.json();
      setLoading(false);
      setContent(slip);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const clickHandler = () => fetchData();
  return (
    <div className="container">
      <div className="card">
        <h5 className="title">advice #{id}</h5>
        {error && <p className="context">{error}</p>}
        {loading && <p className="context">loading...</p>}
        {!loading && <p className="context">&#10077; {advice} &#10078;</p>}
        <div className="divider"></div>
        <button className="button" onClick={clickHandler}>
          <img src={Dice} alt="" />
        </button>
      </div>
    </div>
  );
}

export default App;
