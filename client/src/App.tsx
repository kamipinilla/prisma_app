import { Route, Switch } from 'react-router-dom'
import Companies from './blocks/companies/Companies'
import Company from './blocks/company/Company'
import Specialties from './blocks/specialties/Specialties'

const App: React.FC = () => {
  return (
    <div className="flex justify-center bg-white">
      <div className="w-full max-w-screen-sm mx-6 my-12">
        <Switch>
          <Route exact path={['/companies', '/']}>
            <Companies />
          </Route>
          <Route exact path="/companies/:companyId">
            <Company />
          </Route>
          <Route exact path="/specialties">
            <Specialties />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App