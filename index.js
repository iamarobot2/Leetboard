const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*'
}));

let users = [
    {
        rank:1,
        name:"Avin Joshy",
        username:"iamarobot2129",
        questionsolved:0,
    },
    {
        rank:0,
        name:"Arjun Saji",
        username:"ARJUN_SAJI",
        questionsolved:0,
    },
    {
        rank:0,
        name:"Elbin Santhosh",
        username:"Elbin001",
        questionsolved:0,
    },
    {
        rank:0,
        name:"Anandhu Anoj",
        username:"anandhu_anoj",
        questionsolved:0,
    },
    {
        rank:0,
        name:"Augustine salas",
        username:"Augustine__",
        questionsolved:0,
    },
    {
        rank:0,
        name:"Arun KA",
        username:"",
        questionsolved:0,
    }
];

const query = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      contributions {
        points
      }
      profile {
        reputation
        ranking
      }
      submissionCalendar
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

app.get('/', (req, res) => {
    res.send(`<b>API URL:</b>/<b style="color:crimson;">${req.hostname}</b>`)
});

app.get('/fetchUsersData', (req, res) => {
    let usersData = [];
    let promises = users.map(user => {
        if(user.username) {
            return import('node-fetch').then(fetch => {
                return fetch.default(`https://leetcode.com/graphql`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Referer': 'https://leetcode.com'
                    },
                    body: JSON.stringify({
                        query: query,
                        variables: {username: user.username}
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if(!data.errors){
                        usersData.push({
                            username: user.username,
                            totalSolved: data.data.matchedUser.submitStats.acSubmissionNum[0].count,
                        });
                    }
                })
                .catch(error => console.error('Error:', error));
            });
        }
    });

    Promise.all(promises).then(() => res.send(usersData));
});

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
