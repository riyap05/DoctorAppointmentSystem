const doctorModel = require('../models/doctorModel')
const appointmentModel = require('../models/appointmentModel')
const userModel = require('../models/userModels');
const getDoctorInfoController = async (req,res)=>{

    try 
    {
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success: true,
            message: 'doctor data fetched successfully',
            data: doctor,
        });
        
    } catch (error)
    {
        //console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in fetching Doctor Details' 
        })
        
    }

};

const updateProfileController = async(req,res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body)
        res.status(201).send({
            success: true,
            message : 'Doctor Profile Updated',
            data: doctor,
        })
    } 
    catch (error)
    {
        //console.log(error)
        res.status(500).send({
            success: false,
            message : 'Error in Updating data',
            error,
        })

        
    }

};

const getDoctorByIdController = async(req,res)=>{
    try 
    {
        const doctor= await doctorModel.findOne({_id: req.body.doctorId})
        res.status(200).send({
            success: true,
            message : "Single Doc Info Fetched",
            data : doctor,
        })
        
    } catch (error)
    {
        //console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Single doc info'
        })
        
    }

}

const doctorAppointmentController= async(req,res)=>{
    try{
        const doctor = await doctorModel.findOne({userId : req.body.userId})
        const appointments = await appointmentModel.find({doctorId: doctor._id,})
        res.status(200).send({
            success: true,
            message: "Doctor Appointments Fetched Successfully",
            data: appointments,
        });

    }catch(error){
        //console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in doctor appointments'

        })
    }

}

const updateStatusController= async(req,res)=>
{
    try {
        const {appointmentsId, status} = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, {status})
        const user = await userModel.findOne({_id: appointments.userId});
        const notification = user.notification;
        notification.push({
            type: "Status Updated",
            message: `Your appointment has been ${status}`,
            onClickPath: "/doctor-appointments",
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: "Appointment Status Updated",
        })
        
    } catch (error)
    {
        //console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in updating the Status',
        })
        
    }

}
module.exports = {getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentController,updateStatusController}