import React, { useState, useEffect } from 'react';

// A simple card component
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

// The main App component
const App = () => {
  const [visibleCard, setVisibleCard] = useState(null);
  const handleButtonClick = (newEmail) => {
    makeApiCall(newEmail);
  };




  useEffect(() => {

   

    const makeApiCall = async (email) => {
      try {
        const postData = {
          "user": {
            "attributes": {
              "emailAddress": email
            }
          },
          "source": {
            "channel": "Server"
          },
          "interaction": {
            "name": "Balance Check"
          }
        };
        const url = 'https://eo5b8rvigvotl2v.m.pipedream.net'
        // const url = 'https://atlanticlottery2.us-7.evergage.com/api2/authevent/dev'
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Basic QUFDRUVBNzMtNDJDOS00RDcxLUIxN0MtM0Y4MEIzQjVCRThFOjZyNHNvSlJIUW56WWcwd1kyMmtmNkdUczJVN3RCZmN0VGlhWkJqdTY1Z2s='
            // Add any other headers your API expects, such as authentication tokens
          },
          body: JSON.stringify(postData),
        });

        const data = await response.json();
        console.log(data)
        // Assuming the response contains an object with a key indicating which card to show
        // For example, if the response is { experience: 'Card A' }
        setVisibleCard(data.campaignResponses[0].payload.experience);
      } catch (error) {
        console.error('Error making the API call:', error);
      }
    };

  }, []);

  return (
    <div>
      <button onClick={() => handleButtonClick('mathes.kanagarajan@cloudkettle.com')}>
        Set Email to mathes.kanagarajan@cloudkettle.com
      </button>
      <button onClick={() => handleButtonClick('another.email@example.com')}>
        Set Email to another.email@example.com
      </button>
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
