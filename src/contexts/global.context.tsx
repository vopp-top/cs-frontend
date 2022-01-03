import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
// Types -------------------------------------------------------------------------

interface Context {
  months: [{ id: string; name: string }];
  month: {
    name: string;
    id: string;
  };
}

const GlobalContext = createContext<Context>(null!);

export const useMonth = () => {
  return useContext(GlobalContext);
};

// Component ---------------------------------------------------------------------
const MonthProvider: React.FC = ({ children }) => {
  const [months, setMonths] = useState([{}] as Context["months"]);

  const fetchMonths = async () => {
    const res = await axios
      .get(`https://capi.vopp.top/months`)
      .then((res) => {
        console.log("res", res);
        return res.data;
      })
      .catch((err) => console.log(err));

    setMonths(res);
  };

  useEffect(() => {
    fetchMonths();
  }, []);

  const value = { months, month: { name: months[0].name, id: months[0].id } };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default MonthProvider;
