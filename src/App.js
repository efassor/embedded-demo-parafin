import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ParafinWidget } from "@parafin/react";
import { Header } from "./components/Header.tsx";
import { SideNav } from "./components/SideNav.tsx";
import { jwtDecode } from "jwt-decode";

const apiKey = process.env.REACT_APP_PARAFIN_CLIENT_ID;

const TEST_USERS = {
  none: {
    label: "No Offers Yet",
    personId: "person_973bdad5-070d-43fe-ac02-92387af2210d", 
    externalBusinessId: "beid_no_offer",
  },
  eligible: {
    label: "Eligible Offer",
    personId: "person_b8416918-1859-4a96-8ff0-597e7e51e0e4",
    externalBusinessId: "1e8a7fe8-226b-46ed-88f5-ab568887c38f",
  },
  capital: {
    label: "Capital on the way",
    personId: "person_4dc62bdb-2c41-4753-b284-42588b7d7180",
    externalBusinessId: "something",
  },
  accepted: {
    label: "Offer accepted",
    personId: "person_36b50a34-cbba-4891-8164-c72942cd03ff", 
    externalBusinessId: "8e64ec76-9b5f-45f8-ad8b-70c8cc5e25ba",
  },
};

function App() {
  const [token, setToken] = useState(null);
  const [tab, setTab] = useState("capital");
  const [offerState, setOfferState] = useState("none");

  const fetchToken = async (personId) => {
    if (!apiKey) {
      console.error("Parafin API key is missing");
      return;
    }

    const encoded = btoa(apiKey.trim() + ":");
    console.log("API KEY :" + apiKey)
    console.log("Encoding :" + encoded)

    try {
      console.log(TEST_USERS[offerState].personId)
      const response = await axios.post(
        "https://api.parafin.com/v1/auth/redeem_token",
        {
          person_id: TEST_USERS[offerState].personId
        },
        {
          auth: {
            username: process.env.REACT_APP_PARAFIN_CLIENT_ID,
            password: process.env.REACT_APP_PARAFIN_CLIENT_SECRET,
          },
        }
      );
      //some very easy logging I added to quickly debug what turned out to be an access issue
      console.log("Full response:", response.data);   
      console.log("Received token:", response.data['bearer_token']);
      console.log("Decoded token:", jwtDecode(response.data['bearer_token']));
      setToken(response.data['bearer_token']);
    } catch (err) {
      console.error("Failed to fetch token:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const selectedUser = TEST_USERS[offerState];
    if (selectedUser) {
      fetchToken(selectedUser.personId);
    }
  }, [offerState]);

  if (!token) {
    return <LoadingShell>Token retrieval failed, fix the code Diane...</LoadingShell>;
  }

  return (
    <div>
      <Header />
      <ContentShell>
        <SideNav onClick={(newProduct) => setTab(newProduct)} />
        {tab === "capital" && (
          <PageShell>
            <label>
              Offer State:&nbsp;
              <select
                value={offerState}
                onChange={(e) => setOfferState(e.target.value)}
              >
                {Object.entries(TEST_USERS).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <ParafinWidget
              token={token}
              product="capital"
              // Optional below
              externalBusinessId={TEST_USERS[offerState].externalBusinessId}
              //onOptIn={onOptIn}
            />
          </PageShell>
        )}

      </ContentShell>
    </div>
  );
}

export default App;

// Styled components
const ContentShell = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoadingShell = styled.div`
  padding: 20px;
`;

const PageShell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
  max-width: 1100px;
`;
