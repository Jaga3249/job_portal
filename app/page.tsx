import Home from "./components/Home/Home";
import SignUp from "./signup/page";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Home />
        {/* <SignUp /> */}
      </div>
    </>
  );
};
export default HomePage;
