import { useDispatch, useSelector } from "react-redux";
import { increment, incrementByAmount } from "../reducer/reward";

function Reward() {
  const points = useSelector((state) => state.reward.points);

  const dispatch = useDispatch();
  return (
    <div className="card">
      <div className="container">
        <h4>
          <b>Reward Component</b>
        </h4>

        <h3>Total Reward/Point : ${points}</h3>

        <button onClick={() => dispatch(increment())}>Increment +</button>
        <button onClick={() => dispatch(incrementByAmount(10))}>
          IncrementByTen +
        </button>
      </div>
    </div>
  );
}

export default Reward;
