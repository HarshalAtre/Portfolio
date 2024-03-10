 const router=require('express').Router();
const {Intro,About,Experience,Project,Course,Contact}=require('../models/portfoliModel');
const User= require('../models/userModel');
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

// add project

router.post('/add-project', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(200).send({
            data: project,
            success: true,
            message: 'Project added successfully'
        });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).send({ message: 'Failed to add project. Please try again later.' });
    }
});

// update project

router.post('/update-project', async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        
        if (!project) {
            return res.status(404).send({ success: false, message: 'Project not found.' });
        }
        
        res.status(200).send({ data: project, success: true, message: 'Project updated successfully' });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).send({ message: 'Failed to update project. Please try again later.' });
    }
});

//delete project

router.post('/delete-project', async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedProject = await Project.findByIdAndDelete(_id);

        if (!deletedProject) {
            return res.status(404).send({ success: false, message: 'Project not found.' });
        }

        res.status(200).send({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).send({ message: 'Failed to delete project. Please try again later.' });
    }
});

// Add Course
router.post('/add-course', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(200).send({
            data: course,
            success: true,
            message: 'Course added successfully'
        });
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).send({ message: 'Failed to add course. Please try again later.' });
    }
});

// Update Course
router.post('/update-course', async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        
        if (!course) {
            return res.status(404).send({ success: false, message: 'Course not found.' });
        }
        
        res.status(200).send({ data: course, success: true, message: 'Course updated successfully' });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).send({ message: 'Failed to update course. Please try again later.' });
    }
});

// Delete Course
router.post('/delete-course', async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedCourse = await Course.findByIdAndDelete(_id);

        if (!deletedCourse) {
            return res.status(404).send({ success: false, message: 'Course not found.' });
        }

        res.status(200).send({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).send({ message: 'Failed to delete course. Please try again later.' });
    }
});


//update contact
router.post('/update-contact', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            {_id:req.body._id},
            req.body,
            { new: true }
        );
        res.status(200).send({ data: updatedContact, success: true, message: 'Contact updated successfully' });
    }
    catch (error) {
        console.error('Error updating contact:', error);
    }
})


//admin login
router.post('/admin-login', async (req, res) => {
    try {
        const user=await User.findOne({username:req.body.username,password:req.body.password})
        user.password=""
        if(user){
            res.status(200).send({data:user,success:true,message:'Login successful'})
        }
        else{
            res.status(401).send({success:false,message:'Invalid credentials'})
        }
        
    }catch(error){
        res.status(500).send(error)
    }
})
module.exports=router;