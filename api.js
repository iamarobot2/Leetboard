var users = [
    {
        rank:1,
        name:"Avin Joshy",
        username:"iamrobot2129",
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
]
/*users.sort((a,b)=>{
    if(a.name < b.name)
    {
        return -1;
    }
    if(a.name > b.name)
    {
        return 1;
    }
    return 0;
});*/
var tbdy = document.getElementById('tbody');
/*for(i=0;i<users.length;i++)
{
    var tr = document.createElement('tr');
    for(let val in users[i])
    {
        let td = document.createElement('td');
        td.innerHTML=users[i][val];
        tr.append(td);
    }
    tbdy.appendChild(tr)
}
*/
fetch('https://leetboard.vercel.app/fetchUsersData')
.then(response => response.json())
.then(usersData => {
    usersData.forEach(userData => {
        let user = users.find(user => user.username === userData.username);
        if(user) {
            user.questionsolved = userData.totalSolved;
        }
    });
users.sort((a, b) => b.name - a.name);
    users.sort((a, b) => b.questionsolved - a.questionsolved);
for(i=0;i<users.length;i++)
{
    var tr = document.createElement('tr');
    for(let val in users[i])
    {
        let td = document.createElement('td');
        td.innerHTML=users[i][val];
        tr.append(td);
    }
    tbdy.appendChild(tr)
}
    for(let i = 0; i < users.length; i++) {
        users[i].rank = i + 1;
        let tr = tbdy.children[i];
        tr.children[0].innerHTML = users[i].rank;
        tr.children[3].innerHTML = users[i].questionsolved;
    }
})
.catch(error => console.error('Error:', error));

