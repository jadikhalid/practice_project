import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import RateLimitedUi from "../component/RateLimitedUi";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setLoading(false);
        setIsRateLimited(false);
      } catch (error) {
        console.log("error", error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("An error occurred while fetching notes.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUi />}
    </div>
  );
};

export default HomePage;
