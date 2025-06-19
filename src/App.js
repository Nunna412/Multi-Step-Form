import { useState } from 'react';
import './App.css';
import './styles.css';
function App() {
  const[step,setStep]=useState(1);
  const[confirmed,setConfirmed]=useState(false);
  const[errors,setErrors]=useState({});
  const[isYearlyBilling,setIsYearlyBilling]=useState(false);
  const[formData,setFormData]=useState({
    name:'',
    email:'',
    phone:'',
    plan:{type:'Arcade',price:9,billing:'monthly'},
    addons:{
      onlineService:false,
      largerStorage:false,
      customizableProfile:false,
    },
  });

  const calculateTotal =() =>{
    let total = formData.plan.price;
    const billingFactor = isYearlyBilling ? 10 : 1;

    if(formData.addons.onlineService) {
      total += 1 * billingFactor;
    }
    if(formData.addons.largerStorage) {
      total += 2 * billingFactor;
    }
    if(formData.addons.customizableProfile){
      total += 2* billingFactor;
    }
    return total;
  };

  const renderCurrentStep=() =>{
    if(confirmed){
      return(
        <div className='thank-you-container'>
          <img src="images/icon-thank-you.svg" alt="Thank you icon"  className='thank-you-icon'></img>
          <h2>Thank you!</h2>
          <p>
            Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
          </p>
        </div>
      )
    }
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h2 className="form-title">Personal info</h2>
            <p className="form-description">
              Please provide your name, email address, and phone number.
            </p>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handlePersonalInfoChange}
                placeholder="e.g. Stephen King"
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handlePersonalInfoChange}
                placeholder="e.g. stephenking@lorem.com"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handlePersonalInfoChange}
                placeholder="e.g. +1 234 567 890"
                className={errors.phone ? 'input-error' : ''}
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h2 className="form-title">Select your plan</h2>
            <p className="form-description">
              You have the option of monthly or yearly billing.
            </p>
            <div className="plan-options">
              <div
                className={`plan-card ${formData.plan.type === 'Arcade' ? 'selected' : ''}`}
                onClick={() => handlePlanSelect('Arcade', 9)}
              >
                <img src="images/icon-arcade.svg" alt="Arcade icon" />
                <div className="plan-details">
                  <h3>Arcade</h3>
                  <p>${isYearlyBilling ? '90/yr' : '9/mo'}</p>
                  {isYearlyBilling && <span className="yearly-bonus">2 months free</span>}
                </div>
              </div>
              <div
                className={`plan-card ${formData.plan.type === 'Advanced' ? 'selected' : ''}`}
                onClick={() => handlePlanSelect('Advanced', 12)}
              >
                <img src="images/icon-advanced.svg" alt="Advanced icon" />
                <div className="plan-details">
                  <h3>Advanced</h3>
                  <p>${isYearlyBilling ? '120/yr' : '12/mo'}</p>
                  {isYearlyBilling && <span className="yearly-bonus">2 months free</span>}
                </div>
              </div>
              <div
                className={`plan-card ${formData.plan.type === 'Pro' ? 'selected' : ''}`}
                onClick={() => handlePlanSelect('Pro', 15)}
              >
                <img src="images/icon-pro.svg" alt="Pro icon" />
                <div className="plan-details">
                  <h3>Pro</h3>
                  <p>${isYearlyBilling ? '150/yr' : '15/mo'}</p>
                  {isYearlyBilling && <span className="yearly-bonus">2 months free</span>}
                </div>
              </div>
            </div>

            <div className="billing-toggle">
              <span className={!isYearlyBilling ? 'active' : ''}>Monthly</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isYearlyBilling}
                  onChange={() => setIsYearlyBilling(!isYearlyBilling)}
                />
                <span className="slider round"></span>
              </label>
              <span className={isYearlyBilling ? 'active' : ''}>Yearly</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h2 className="form-title">Pick add-ons</h2>
            <p className="form-description">Add-ons help enhance your gaming experience.</p>

            <div className="addon-options">
              <label
                className={`addon-card ${
                  formData.addons.onlineService ? 'selected' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.addons.onlineService}
                  onChange={() => handleAddonToggle('onlineService')}
                />
                <div className="addon-details">
                  <h4>Online service</h4>
                  <p>Access to multiplayer games</p>
                </div>
                <span className="addon-price">
                  +${isYearlyBilling ? '10/yr' : '1/mo'}
                </span>
              </label>

              <label
                className={`addon-card ${
                  formData.addons.largerStorage ? 'selected' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.addons.largerStorage}
                  onChange={() => handleAddonToggle('largerStorage')}
                />
                <div className="addon-details">
                  <h4>Larger storage</h4>
                  <p>Extra 1TB of cloud save</p>
                </div>
                <span className="addon-price">
                  +${isYearlyBilling ? '20/yr' : '2/mo'}
                </span>
              </label>

              <label
                className={`addon-card ${
                  formData.addons.customizableProfile ? 'selected' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.addons.customizableProfile}
                  onChange={() => handleAddonToggle('customizableProfile')}
                />
                <div className="addon-details">
                  <h4>Customizable Profile</h4>
                  <p>Custom theme on your profile</p>
                </div>
                <span className="addon-price">
                  +${isYearlyBilling ? '20/yr' : '2/mo'}
                </span>
              </label>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h2 className="form-title">Finishing up</h2>
            <p className="form-description">
              Double-check everything looks OK before confirming.
            </p>

            <div className="summary-card">
              <div className="summary-plan">
                <div>
                  <h3>
                    {formData.plan.type} ({isYearlyBilling ? 'Yearly' : 'Monthly'})
                  </h3>
                  <button className="change-plan-btn" onClick={() => setStep(2)}>
                    Change
                  </button>
                </div>
                <span>
                  ${isYearlyBilling ? formData.plan.price + '/yr' : formData.plan.price + '/mo'}
                </span>
              </div>
              <hr className="summary-divider" />
              {formData.addons.onlineService && (
                <div className="summary-addon">
                  <p>Online service</p>
                  <span>
                    +${isYearlyBilling ? '10/yr' : '1/mo'}
                  </span>
                </div>
              )}
              {formData.addons.largerStorage && (
                <div className="summary-addon">
                  <p>Larger storage</p>
                  <span>
                    +${isYearlyBilling ? '20/yr' : '2/mo'}
                  </span>
                </div>
              )}
              {formData.addons.customizableProfile && (
                <div className="summary-addon">
                  <p>Customizable Profile</p>
                  <span>
                    +${isYearlyBilling ? '20/yr' : '2/mo'}
                  </span>
                </div>
              )}
            </div>

            <div className="total-section">
              <p>Total ({isYearlyBilling ? 'per year' : 'per month'})</p>
              <span className="total-price">
                +${calculateTotal()}/{isYearlyBilling ? 'yr' : 'mo'}
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  const prevStep = ()=>{
    setStep(step - 1);
  }
  
  const nextStep =()=>{
    if(step === 1){
      if(validateStep1()){
        setStep(step+1);
      }
    } else if (step < 4){
      setStep(step+1);
    } else if ( step === 4){
      setConfirmed(true);
    }
  }

  const validateStep1 = ()=>{
    const newErrors = {};
    if(!formData.name.trim()){
      newErrors.name='Name is required';
    }
    if(!formData.email.trim()){
      newErrors.email='Email address is required';
    }
    if(!formData.phone.trim()){
      newErrors.phone='This field is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePersonalInfoChange=(e)=>{
    const{name,value}= e.target;
    setFormData((prevData)=>({...prevData,[name]:value}));
  };
   
  const handlePlanSelect =(planType,monthlyPrice)=>{
    setFormData((prevData)=>({
      ...prevData,
      plan:{
        type:planType,
        price: isYearlyBilling?monthlyPrice*10 : monthlyPrice,
        billing: isYearlyBilling?'yearly':'monthly',
      },
    }));
  };
   
  const handleAddonToggle = (addonName)=>{
    setFormData((prevData) => ({
      ...prevData,
      addons:{
        ...prevData.addons,
        [addonName]:!prevData.addons[addonName],
      },
    }));
  };


  return (
    <>
    <div className='app-container'>
      <div className='multi-step-form-card'>
        <div className='sidebar' style={{backgroundImage:`url(images/bg-sidebar-desktop.svg)`}}>
        <div className='sidebar-steps'>
          <div className='step-item'>
            <div className={`step-number ${step === 1 ? 'active': ''}`}>1</div>
            <div className='step-info'>
              <p>STEP 1</p>
              <h3>YOUR INFO</h3>
            </div>
          </div>
          <div className='step-item'>
              <div className={`step-number ${step === 2 ? 'active':''}`}>2</div>
              <div className='step-info'>
                  <p>STEP 2</p>
                  <h3>SELECT PLAN</h3>
              </div>
          </div>
          <div className='step-item'>
              <div className={`step-number ${step === 3?'active':''}`}>3</div>
              <div className='step-info'>
                  <p>STEP 3</p>
                  <h3>ADD-ONS</h3>
              </div>
          </div>
          <div className='step-item'>
            <div className={`step-number ${step === 4?'active':''}`}>4</div>
            <div className='step-info'>
                <p>STEP 4</p>
                <h3>SUMMARY</h3>
            </div>
          </div>
        </div>
        </div>
        <div className='form-content'>
          {renderCurrentStep()}
          {!confirmed && (
          <div className='form-navigation'>
            { step > 1 && (
              <button onClick={prevStep} className='back-button'>Go Back</button>
            )}
            <button onClick={nextStep} className={`next-button & {step === 4? 'confirm-button':''}`}>{ step === 4? 'Confirm':'Next Step'}</button>
          </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
