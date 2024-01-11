import { useState, useEffect, useCallback, useRef } from 'react'
import { styled } from 'styled-components'
import { keyframes } from 'styled-components'
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";
import { Tooltip } from 'react-tooltip'

function App() {
  const [length, setLength] = useState(12)
  const [uppercaseFlag, setUppercaseFlag] = useState(false)
  const [numberFlag, setNumberFlag] = useState(false)
  const [specialCharFlag, setSpecialCharFlag] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  // Any any of the values in the dependency array does not change too often re-run GenPassword
  const GenPassword = useCallback(() => {
    let password = '';
    let letters = 'abcdefghijklmnopqrstuvwxyz';

    if (uppercaseFlag) letters += 'ABCDEFGHIJKLMMOPQRSTUWXYZ' ;
    if (numberFlag) letters += '1234567890';
    if (specialCharFlag) letters +=  '!@#$%^&*_-+=|:;<,>.?';

    for(let i = 1; i<= length; i++) 
      password += letters[Math.floor(Math.random() * letters.length)];

    setPassword(password);
  }, [length, uppercaseFlag, numberFlag, specialCharFlag]) 
  
  const CopyPassword = () => { window.navigator.clipboard.writeText(password); passwordRef.current?.select() }

  // Any any of the values in the dependency changes re-run GenPassword
  useEffect(() => { 
    GenPassword() 
  }, [length, uppercaseFlag, numberFlag, specialCharFlag])

  return (
    <>
      {/* <div className="gradient-container">

        <div className="gradient-area">
          <div className="bubble-1"></div>
          <div className="bubble-2"></div>
          <div className="bubble-3"></div>
          <div className="bubble-4"></div>
          <div className="bubble-5"></div>
          <div className="bubble-6"></div> */}
          <Container >
            <Wrapper className='shadow-lg shadow-gray-800'>
              <FormGenerator>
                <FormHeader>
                  <h1 className='text-xl font-extrabold text-shadow'>Password Generator App</h1>
                  {/* <IoSunnyOutline fontSize={25}></IoSunnyOutline> */}
                </FormHeader>

                <div className="flex flex-col">
                  <PasswordArea data-tooltip-id='password-tooltip' className='rounded-lg
                                    hover:shadow-lg hover:shadow-sky-500
                                    transition-shadow duration-300 ease-in-out' onClick={CopyPassword}>
                    <input type="text" 
                          className='pl-2
                                  bg-white border border-slate-300
                                  text-gray-800 text-center text-md font-bold
                                  placeholder-slate-400 
                                    w-4/5 h-10
                                    cursor-pointer rounded-l-lg
                                    shadow-2xl shadow-slate-300
                                    outline-none selection:'
                          placeholder="Generate a new password"
                          value={password}
                          readOnly={true}
                          ref={passwordRef} />
                      <div className='bg-slate-950 text-gray-100
                                      flex justify-center items-center                                
                                      w-1/5 h-10   
                                      p-4              
                                      cursor-pointer rounded-r-lg
                                      shadow-2xl shadow-slate-300
                                      outline-none'>
                          <MdOutlineContentCopy size={20} />
                      </div>
                  </PasswordArea>
                  <Tooltip id="password-tooltip" place="right-end">
                    Click to copy
                  </Tooltip>
                </div>

                <div className="flex flex-col gap-2">
                  <Column>
                    <input type="range" className='px-2 w-full'
                      min={6} max={32}
                      value={length}
                      onChange={(e) => setLength(e.target.value)} />
                    <label className="text-md font-normal">Length: {length}</label>
                  </Column>

                  <Row>
                    <label className="text-md font-light">Uppercase letters :</label>
                    <label className="relative flex justify-between items-center group">
                      <input type="checkbox" className="relative peer appearance-none rounded-md"
                        checked={uppercaseFlag}
                        onChange={() => {
                          setUppercaseFlag((prev) => !prev)                          
                          console.log("uppercaseFlag: " + uppercaseFlag);
                        }} />
                      <span className="w-16 h-9 flex items-center
                              flex-shrink-0 ml-4 scale-90
                              p-1
                              bg-gray-300 
                              rounded-full transition-all duration-300 ease-in-out
                              after:w-7 after:h-7
                              after:bg-white after:transition-all  after:rounded-full
                              after:shadow-md after:duration-300 after:ease-in-out
                              peer-checked:after:translate-x-6 group-hover:after:translate-x-1
                              peer-checked:bg-[#0af5f1e7]"></span>
                    </label>
                  </Row>

                  <Row>
                    <label className="text-md font-light">Numbers :</label>
                    <label className="relative flex justify-between items-center group">
                      <input type="checkbox" className="relative peer appearance-none rounded-md"
                        checked={numberFlag}
                        onChange={() => {
                          setNumberFlag((prev) => !prev)
                          console.log("numberFlag: " + numberFlag);
                        }} />
                      <span className="w-16 h-9 flex items-center
                              flex-shrink-0 ml-4 scale-90
                              p-1
                              bg-gray-300 
                              rounded-full duration-300 ease-in-out
                              after:w-7 after:h-7
                              after:bg-white after:rounded-full
                              after:shadow-md after:duration-300
                              peer-checked:after:translate-x-6 group-hover:after:translate-x-1
                              peer-checked:bg-[#0af5f1e7]"></span>
                    </label>
                  </Row>

                  <Row>
                    <label className="text-md font-light">Special Characters:</label>
                    <label className="relative flex justify-between items-center group">
                      <input type="checkbox" className="relative peer appearance-none rounded-md"
                        checked={specialCharFlag}
                        onChange={() => {
                          setSpecialCharFlag((prev) => !prev)
                          console.log("specialCharFlag: " + specialCharFlag);
                        }} />
                      <span className="w-16 h-9 flex items-center
                              flex-shrink-0 ml-4 scale-90
                              p-1
                              bg-gray-300 
                              rounded-full duration-300 ease-in-out
                              after:w-7 after:h-7
                              after:bg-white after:rounded-full
                              after:shadow-md after:duration-300
                              peer-checked:after:translate-x-6 group-hover:after:translate-x-1
                              peer-checked:bg-[#0af5f1e7]"></span>
                    </label>
                  </Row>
                </div>

                <Row className="mt-4">
                  <button className='bg-slate-900 text-gray-200 text-md font-semibold
                                  shadow-sky-100 shadow-sm rounded-xl
                                  hover:shadow-sky-300 hover:shadow-lg hover:text-white
                                  hover:bg-[#0077ffe7]
                                  transition-all duration-500 ease-in-out
                                  flex justify-center items-center
                                  px-6 py-1
                                  h-10 w-full'
                          onClick={GenPassword}>Generate password</button>
                </Row>
              </FormGenerator>
            </Wrapper>
          </Container>
        {/* </div>
      </div> */}
    </>
  )
}

const breatheAnimation = keyframes`
 0% {   background-position: 0 50%; }
 50% {   background-position: 100% 100%; }
 100% {   background-position: 0 50%; }
`

const Container = styled.div`  
  width: 100%;
  height: 100vh;
  /* background-image: linear-gradient(-45deg,
                            #ee0819,
                            #aa085b,
                            #4d09bb,
                            #1908eb); */
  background-image: linear-gradient(-45deg, #FFBE0B, #FB5607, #FF006E, #8338ec, #3A86FF);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
  animation: ${breatheAnimation} 4s ease-in-out infinite;
  z-index: 1;
`

const Wrapper = styled.div`
  width: 23rem;
    /* backdrop-filter: blur(16px) saturate(180%); */
    /* -webkit-backdrop-filter: blur(16px) saturate(180%); */
    background-color: rgba(19, 20, 25, 0.65);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
    z-index: 50;
`

const FormGenerator = styled.div`
  padding: 1.5rem 2rem;
`

const FormHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #EEF0F2;
  border-left: 1px solid #EEF0F2;
  border-bottom: 3px solid #EEF0F2;
  border-right: 3px solid #EEF0F2;
  border-radius: .5rem;
  padding: .55rem 0;
  margin: 1rem 0;
  color: #EEF0F2;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const PasswordArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .25rem 0;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
`

export default App
