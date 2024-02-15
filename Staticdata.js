const intros=[{
        welcomeText:"Hi , I am",
        firstName:"Harshal" ,
        lastName:"Atre",
        caption:"I Make Things For Web",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus quisquam reprehenderit accusamus molestias deserunt veritatis sequi quo sapiente porro, temporibus quaerat similique laudantium numquam doloremque alias. Cum iste deleniti cupiditate."
}]
const abouts=[{
    lottieUrl:"https://lottie.host/85509418-d8e2-4054-a425-b6d601a58004/32hbbZbPeX.json"
      ,
      description1:"Hello! My name is Harshal Atre. I enjoy creating things that live on the internet. My interest in web development started in 2022 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS",
      description2:"Fast-forward to today. and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My maln focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients. I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.",
      skills:["Javascript","React","Node","Express","MongoDB"]
}]

const projects = [
    {   
      technologies: [],
      id: "6301203d4042e2d798b59dc7",
      title:"SHEYPIZZA", 
      image :"https://sheysathya2.netlify.app/pizzas.svg",
      description:"An ecommerce application developed using react , node redux and mongodb",
      link:"/"
    },
    {   
      technologies: [],
      id: "7301203d4042e2d798b59dc8",
      title:"SHEYSHOP", 
      image :"https://sheysathya2.netlify.app/ecommerce.svg",
      description:"A demo project developed using react , node redux and mongodb",
      link:"/demo1"
    },
    {   
      technologies: [],
      id: "8301203d4042e2d798b59dc9",
      title:"SHEYHOTEL", 
      image :"https://sheysathya2.netlify.app/hotels.svg",
      description:"Another demo project developed using react , node redux and mongodb",
      link:"/demo2"
    },
    {   
      technologies: [],
      id: "9301203d4042e2d798b59dc10",
      title:"SHEYCARS", 
      image :"https://sheysathya2.netlify.app/job.svg",
      description:"Yet another demo project developed using react , node redux and mongodb",
      link:"/demo3"
    },
    {   
      technologies: [],
      id: "10301203d4042e2d798b59dc11",
      title:"SHEYJOBS", 
      image :"https://sheysathya2.netlify.app/social.svg",
      description:"A fourth demo project developed using react , node redux and mongodb",
      link:"/demo4"
    },
   
  ]
  const contactSchema=new mongoose.Schema({
    name:"Harshal Atre",
    gender:"Male",
    email:"harshalatre2@gmail.com",
    mobile:"8160170389",
    age:"20",
    address:"Main nahi bataunga..."
  
  })

  