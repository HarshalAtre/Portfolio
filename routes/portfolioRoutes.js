 const router=require('express').Router();
const {Intro,About,Experience,Project,Course,Contact}=require('../models/portfoliModel');
//get all portfolio data
router.get('/get-portfolio-data',async(req,res)=>{
    try{
        const intro=await Intro.find();
        const about=await About.find();
        const experience=await Experience.find();
        const project=await Project.find();
        const course=await Course.find();
        const contact=await Contact.find();
        res.status(200).send({
            intro:intro[0],
            about:about[0],
            experience:experience,
            projects:project,
            courses:course,
            contact:contact[0]
        })
    }
    catch(err){
        res.status(500).send({message:'Internal Server Error'})
    }
})
//update intro
router.post('/update-intro',async(req,res)=>{
    try{
     const intro=await Intro.findOneAndUpdate({_id:req.body._id},req.body,{new:true});
     res.status(200).send(   
        {   data:intro,
            success:true,
            message:'Intro updated successfully'
        })
    }
    catch(err){
       res.status(500).send({message:'Internal Server Error'})
    }
}
)
//update about
router.post('/update-about',async(req,res)=>{
    try{
     const about=await About.findOneAndUpdate({_id:req.body._id},req.body,{new:true});
     res.status(200).send(   
        {   data:about,
            success:true,
            message:'About updated successfully'
        })
    }
    catch(err){
       res.status(500).send({message:'Internal Server Error'})
    }
}
)
//add experience
router.post('/add-experience', async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(200).send({
            data: experience,
            success: true,
            message: 'Experience added successfully'
        });
    } catch (err) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//update experience
router.post('/update-experience', async (req, res) => {
    try {
        const experience = await Experience.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        res.status(200).send({
            data: experience,
            success: true,
            message: 'Experience updated successfully'
        })
    }
    catch (err) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
})
//delete experience
router.post('/delete-experience', async (req, res) => {
    try {
        await Experience.findOneAndDelete({ _id: req.body._id });
        res.status(200).send({
            data: experience,
            success: true,
            message: 'Experience deleted successfully'
        })
    }
    catch (err) {
        res.status(500).send({ message: 'Internal Server Error' });
        
    }
})
module.exports=router;