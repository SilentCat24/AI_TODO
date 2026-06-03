import Slider from "react-slick";
import useAuth from "./Custom";
import { useEffect } from "react";

const Tasks = () => {
  const { fetchdata, list } = useAuth();

  useEffect(() => {
    fetchdata();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ width: "80%", margin: "30px auto" }}>
      <Slider {...settings}>
        {list.map((todo) => (
          <div key={todo._id}>
            <div
              style={{
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                margin: "10px",
              }}
            >
              <h2>{todo.task}</h2>

              <p>
                Scheduled: {new Date(todo.scheduledAt).toLocaleString()}
              </p>

              <h4>AI Suggestions:</h4>

              <ul>
                {todo.suggestions?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Tasks;