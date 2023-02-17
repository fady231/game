const fetchdata = async () => {
  const data = {  
    
    mail: "fdssfadsdssss.com",
    password: "(12345678)"
   
};
  const res = await fetch("http://localhost:3000/parent/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
  const data2 = await res.json();
  return data2;
};
console.log(fetchdata());
