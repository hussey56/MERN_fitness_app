import React, { useRef, useState } from 'react'
import ProfileCard from './component/ProfileCard'
import { useDispatch, useSelector } from 'react-redux';
import { updateuser, updateuserpassword } from '../../Api/internal';
import { setUser } from '../../Store/UserSlice';
import PasswordInput from '../../Components/TextInput/PasswordInput';
import { useFormik } from 'formik';
import PasswordSchema from '../../Schema/PassWordSchema';

const Profile = () => {
  const ref = useRef();
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user);
  const userId = user._id;
  const [fullname,setFullname]=useState(user.fullname);
  const [email,setEmail]=useState(user.email);
  const [picture,setPicture] =useState('');
  const [passwordvisible, setPasswordVisible] = useState(false);
  const [cpasswordvisible, setcPasswordVisible] = useState(false);
const [cloading,setcLoading] =useState(false);
  const getPhoto = (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = ()=>{
        setPicture(reader.result);
    }
  
}
const[loading,setLoading]=useState(false);
const handleSubmit =async(e)=>{
  e.preventDefault();
  setLoading(true)
  const data = {
    fullname:fullname,
    email:email,
    profilePhoto:picture
  }
  try{
    const response = await updateuser(data);
    if(response.status == 200){
      const user ={
        _id :response.data.user._id,
        email:response.data.user.email,
        username:response.data.user.username,
        fullname:response.data.user.fullname,
        profileImage:response.data.user.profileImage,
        auth:response.data.auth
      }
      dispatch(setUser(user));
    }
  }catch(e){
    console.log(e);
  }
 
  ref.current.click();
  setLoading(false)

}

const { values, handleBlur, handleChange, touched, errors } = useFormik({
  initialValues: {
    newpassword: "",
    oldpassword:""
  },
  validationSchema: PasswordSchema,
});
const handlePasswordChange=async(e)=>{
  e.preventDefault();
setcLoading(true);
try {
  const data ={
    oldpassword:values.oldpassword,
    newpassword:values.newpassword,
    userId:userId
  }
  const response = await updateuserpassword(data);
  if(response.status ==201){
    alert("Incorrect old password")
  }
  if(response.status == 200){
    alert("Password Changed Successfully")
  }
} catch (error) {
  console.log(error)
}
values.oldpassword ="";
values.newpassword="";
ref.current.click();
setcLoading(false);
}
  return (
    <>
    <h1 className='text-center mt-2 mb-4' style={{fontWeight:'600',fontFamily:'monospace'}}><span className='text-primary' style={{fontFamily:'cursive'}}>My</span> Profile</h1>
      <ProfileCard/>
      <div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
        <button type="button" className="btn-close" ref={ref} data-bs-dismiss="modal" aria-label="Close"></button>

      </div>
      <form onSubmit={handleSubmit}>
      <div className="modal-body">
      <label htmlFor="username">Username</label>
<input type="text" disabled={true} value={user.username} className='form-control mb-1' onChange={(e)=>setEmail(e.target.value)} />  
      <label htmlFor="email">Email</label>
<input type="email" disabled={true} value={email} className='form-control mb-1' onChange={(e)=>setEmail(e.target.value)} required/>  
<label htmlFor="fullname">Edit Full Name</label>
<input type="text" value={fullname} className='form-control mb-1' onChange={(e)=>setFullname(e.target.value)} required /> 

<label htmlFor="profileImage">Profile Image</label>
<input type="file" className='form-control mb-1' accept='image/jpg image/jpeg image/png' onChange={getPhoto} />
{picture !==''?<img src={picture} width={150} height={150} alt='user-profile'/>:''}

     </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary" disabled={loading || email=='' || fullname ==''}>{loading && 'Updating ...'}{!loading &&'Save changes'}</button>
      </div>
      </form>
      <hr />
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
      </div>
      <div className="modal-body">
      <PasswordInput
                  inputname="Old Password"
                  name="oldpassword"
                  passwordvisible={passwordvisible}
                  tooglepassword={() => setPasswordVisible(!passwordvisible)}
                  value={values.oldpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your current password"
                  error={errors.oldpassword && touched.oldpassword ? 1 : undefined}
                  errormessage={errors.oldpassword}
                />

                <PasswordInput
                  inputname="New Password"
                  name="newpassword"
                  passwordvisible={cpasswordvisible}
                  tooglepassword={() => setcPasswordVisible(!cpasswordvisible)}
                  value={values.newpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter new password"
                  error={
                    errors.newpassword && touched.newpassword
                      ? 1
                      : undefined
                  }
                  errormessage={errors.newpassword}
                />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" disabled={cloading || !values.newpassword || !values.oldpassword || errors.newpassword || errors.oldpassword} onClick={handlePasswordChange}>{cloading && 'Updating ...'}{!cloading &&'Change Password'}</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Profile
