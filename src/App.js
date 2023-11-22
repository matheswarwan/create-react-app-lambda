import React, { useState } from 'react';

// A simple card component that accepts props for title and content
const Card = ({ title, content, visible }) => {
  if (!visible) return null;

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '20px',
      margin: '10px',
      display: 'inline-block'
    }}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

// The main App component with added button styles
const App = () => {
  const [visibleCard, setVisibleCard] = useState(null);
  const [emailAddress, setEmailAddress] = useState('mathes.kanagarajan@cloudkettle.com');

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px'
  };

  const handleButtonClick = (newEmail) => {
    console.log('handleButtonClick ' + newEmail)
    setEmailAddress(newEmail);
    makeApiCall(newEmail)
  };

  const makeApiCall = async (emailAddress) => {
    const postData = {
      "user": {
        "attributes": {
          "emailAddress": emailAddress
        }
      },
      "source": {
        "channel": "Server"
      },
      "interaction": {
        "name": "Balance Check"
      }
    };

    try {
      let url ; 
      
      if(emailAddress == 'mathes.kanagarajan@cloudkettle.com') { 
        url = 'https://eooua2tgrkxysys.m.pipedream.net'
      }else if(emailAddress == 'mathes.btech@gmail.com') { 
        url = 'https://eozx35ubjgufv9n.m.pipedream.net'
      }
      console.log(emailAddress)
      console.log(url)
      // const url = 'https://atlanticlottery2.us-7.evergage.com/api2/authevent/dev'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers your API expects, such as authentication tokens
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      console.log('Response from MCP - ' , data)
      // Assuming the response contains an object with a key indicating which card to show
      setVisibleCard(data.campaignResponses[0].payload.experience);
    } catch (error) {
      console.error('Error making the API call:', error);
    }
  };

  return (
    <div>
      <button style={buttonStyle} onClick={() => handleButtonClick('mathes.kanagarajan@cloudkettle.com')}>
        login as mathes.kanagarajan@cloudkettle.com
      </button>
      <button style={buttonStyle} onClick={() => handleButtonClick('mathes.btech@gmail.com')}>
        login as mathes.btech@gmail.com
      </button>
      
      {/* Cards will be shown based on the API call response */}
      <Card
        title="Card Title 1"
        content="This is some content for the first card."
        visible={visibleCard === 'Card A'}
      />
      <Card
        title="Card Title 2"
        content="This is some content for the second card."
        visible={visibleCard === 'Card B'}
      />
    </div>
  );
};

export default App;
