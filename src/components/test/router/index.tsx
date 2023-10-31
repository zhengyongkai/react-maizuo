import {HashRouter,Navigate,Route,Router,Routes,} from 'react-router-dom'
import Page1 from './page/page1'
import Page2 from './page/page2'
import Page3 from './page/page3'


export default function RouterPage(){
  return <>
    
      
            <Route path='/home/*' element={<Page1/>}></Route>
            


           
    


  </>
}